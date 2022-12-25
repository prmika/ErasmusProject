import IUserRepo from '../services/IRepos/IUserRepo';
import { UserMap } from "../mappers/UserMap";

import { Request, Response, NextFunction } from 'express';
import Container, { Inject, Service } from 'typedi';
import config from "../../config";

import IUserController from "./IControllers/IUserController";
import IUserService from '../services/IServices/IUserService';
import { IUserDTO } from '../dto/IUserDTO';
import Logger from '../loaders/logger';
import { Result } from "../core/logic/Result";

@Service()
export default class UserController implements IUserController {
    constructor(
        @Inject(config.services.user.name) private userServiceInstance: IUserService
    ) { }

    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.getUser(req.params.email) as Result<IUserDTO>;

            if (userOrError.isFailure) {
                return res.status(404).send();
            }

            const userDTO = userOrError.getValue();
            return res.json(userDTO).status(200);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.findAll() as Result<IUserDTO[]>;

            if (userOrError.isFailure) {
                return res.status(402).send();
            }

            const userDTOs = userOrError.getValue();
            return res.json(userDTOs).status(200);
        }
        catch (e) {
            return next(e);
        }
    };

    public async anonymizeUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.anonymize(req.params.id) as Result<IUserDTO>;

            if (userOrError.isFailure) {
                return res.status(404).send("Couldn't find user with given id, therefore anonymization was not performed.");
            }

            const userDTO = userOrError.getValue();
            return res.json(userDTO).status(200);
        }
        catch (e) {
            return next(e);
        }
    };
}

exports.getMe = async function(req, res: Response) {
  
    // NB: a arquitetura ONION não está a ser seguida aqui

    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.token || req.token == undefined )
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    const user = await userRepo.findById( req.token.id );
    if (!user)
        return res.json( new Error("Utilizador não registado")).status(401);

    const userDTO = UserMap.toDTO( user ) as IUserDTO;
    return res.json( userDTO ).status(200);
}
