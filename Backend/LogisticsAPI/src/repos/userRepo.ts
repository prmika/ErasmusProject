import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import { User } from "../domain/user";
import { UserId } from "../domain/userId";
import { UserEmail } from "../domain/userEmail";
import { UserMap } from "../mappers/UserMap";

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;

  constructor(
    @Inject('userSchema') private userSchema : Model<IUserPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (userId: UserId | string): Promise<boolean> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX}; 
    const userDocument = await this.userSchema.findOne( query );

    return !!userDocument === true;
  }

  public async save (user: User): Promise<User> {
    const query = { domainId: user.id.toString() }; 

    const userDocument = await this.userSchema.findOne( query );

    try {
      if (userDocument === null ) {
        const rawUser: any = UserMap.toPersistence(user);

        const userCreated = await this.userSchema.create(rawUser);

        return UserMap.toDomain(userCreated);
      } else {
        userDocument.firstName = user.firstName;
        userDocument.lastName = user.lastName;
        userDocument.role = user.role.name;
        userDocument.password = user.password.value;
        userDocument.phoneNr = user.phoneNr;
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail (email: UserEmail | string): Promise<User> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findById (userId: UserId | string): Promise<User> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX }; 
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findAll (): Promise<User[]> {
    const userRecords = await this.userSchema.find({});
    let userRecordsMapped = [] as User[];
    if( userRecords != null) {
      userRecords.forEach(user => userRecordsMapped.push(UserMap.toDomain(user)))
      return userRecordsMapped;
    }
    else
      return null;
  }

  public async anonymize (id: UserId | string): Promise<User> {
    const idX = id instanceof UserId ? (<UserId>id).id.toValue() : id;

    const query = { domainId: idX }; 

    const userDocument = await this.userSchema.findOne( query );

    try {
      if (userDocument === null ) {
        return null;
      } else {
        userDocument.firstName = "Anonymized";
        userDocument.lastName = "Anonymized";
        userDocument.email = `anonymized${userDocument.id}@gmail.com`;
        userDocument.password = "*********";
        userDocument.phoneNr = "+00000000000";
        userDocument.isActive = false;
        await userDocument.save();

        return UserMap.toDomain(userDocument);
      }
    } catch (err) {
      throw err;
    }
  }
}