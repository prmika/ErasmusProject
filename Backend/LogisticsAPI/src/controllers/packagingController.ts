import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPackagingController from "./IControllers/IPackagingController";
import IPackagingService from '../services/IServices/IPackagingService';
import { IPackagingDTO } from '../dto/IPackagingDTO';
import Logger from '../loaders/logger';
import { Result } from "../core/logic/Result";

@Service()
export default class PackagingController implements IPackagingController {
    constructor(
        @Inject(config.services.packaging.name) private packagingServiceInstance: IPackagingService
    ) { }

    public async getPackaging(req: Request, res: Response, next: NextFunction) {
        try {
            const packagingOrError = await this.packagingServiceInstance.getPackaging(req.params.packagingId) as Result<IPackagingDTO>;

            if (packagingOrError.isFailure) {
                return res.status(404).send();
            }

            const packagingDTO = packagingOrError.getValue();
            return res.json(packagingDTO).status(200);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getAllPackages(req: Request, res: Response, next: NextFunction) {
        try {
            const packagingOrError = await this.packagingServiceInstance.getAllPackages() as Result<IPackagingDTO[]>;

            if (packagingOrError.isFailure) {
                return res.status(404).send();
            }

            const packagingDTOs = packagingOrError.getValue();
            return res.json(packagingDTOs).status(200);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getAllPackagesPaged(req: Request, res: Response, next: NextFunction) {
        try {
            const packagingOrError = await this.packagingServiceInstance.getAllPackagesPaged(Number(req.params.page),Number(req.params.numberOfItems)) as Result<IPackagingDTO[]>;

            if (packagingOrError.isFailure) {
                return res.status(404).send();
            }

            const packagingDTOs = packagingOrError.getValue();
            return res.json(packagingDTOs).status(200);
        }
        catch (e) {
            return next(e);
        }
    };

    public async createPackaging(req: Request, res: Response, next: NextFunction) {
        try {
            const packagingOrError = await this.packagingServiceInstance.createPackaging(req.body as IPackagingDTO) as Result<IPackagingDTO>;
            if (packagingOrError.isFailure) {
                return res.status(404).send();
            }

            const packagingDTO = packagingOrError.getValue();
            return res.json(packagingDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async updatePackaging(req: Request, res: Response, next: NextFunction) {
        try {
            const packagingOrError = await this.packagingServiceInstance.updatePackaging(req.params.packagingId, req.body as IPackagingDTO) as Result<IPackagingDTO>;

            if (packagingOrError.isFailure) {
                return res.status(404).send();
            }

            const packagingDTO = packagingOrError.getValue();
            return res.status(201).json(packagingDTO);
        }
        catch (e) {
            return next(e);
        }
    };
}