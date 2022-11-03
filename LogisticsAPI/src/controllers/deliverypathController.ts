import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IDeliveryPathController from "./IControllers/IDeliveryPathController";
import IDeliveryPathService from '../services/IServices/IDeliveryPathService';
import { IDeliveryPathDTO } from '../dto/IDeliveryPathDTO';
import Logger from '../loaders/logger';
import { Result } from "../core/logic/Result";

@Service()
export default class DeliveryPathController implements IDeliveryPathController {
    constructor(
        @Inject(config.services.deliverypath.name) private deliverypathServiceInstance: IDeliveryPathService
    ) { }

    public async getDeliveryPath(req: Request, res: Response, next: NextFunction) {
        try {
            const deliverypathOrError = await this.deliverypathServiceInstance.getDeliveryPath(req.params.deliverypathId) as Result<IDeliveryPathDTO>;

            if (deliverypathOrError.isFailure) {
                return res.status(402).send();
            }

            const deliverypathDTO = deliverypathOrError.getValue();
            return res.json(deliverypathDTO).status(200);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getAllDeliveryPaths(req: Request, res: Response, next: NextFunction) {
        try {
            const deliverypathOrError = await this.deliverypathServiceInstance.getAllDeliveryPaths() as Result<IDeliveryPathDTO[]>;

            if (deliverypathOrError.isFailure) {
                return res.status(402).send();
            }

            const deliverypathDTOs = deliverypathOrError.getValue();
            return res.json(deliverypathDTOs).status(200);
        }
        catch (e) {
            return next(e);
        }
    };

    public async createDeliveryPath(req: Request, res: Response, next: NextFunction) {
        try {
            const deliverypathOrError = await this.deliverypathServiceInstance.createDeliveryPath(req.body as IDeliveryPathDTO) as Result<IDeliveryPathDTO>;
            if (deliverypathOrError.isFailure) {
                return res.status(402).send();
            }

            const deliverypathDTO = deliverypathOrError.getValue();
            return res.json(deliverypathDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async updateDeliveryPath(req: Request, res: Response, next: NextFunction) {
        try {
            const deliverypathOrError = await this.deliverypathServiceInstance.updateDeliveryPath(req.params.deliverypathId, req.body as IDeliveryPathDTO) as Result<IDeliveryPathDTO>;

            if (deliverypathOrError.isFailure) {
                return res.status(404).send();
            }

            const deliveryPathDTO = deliverypathOrError.getValue();
            return res.status(201).json(deliveryPathDTO);
        }
        catch (e) {
            return next(e);
        }
    };
}