import { Request, Response, NextFunction } from 'express';

export default interface IDeliveryPathController  {
    getDeliveryPath(req: Request, res: Response, next: NextFunction);
    getAllDeliveryPaths(req: Request, res: Response, next: NextFunction);
    getAllDeliveryPathsPaged(req: Request, res: Response, next: NextFunction);
    createDeliveryPath(req: Request, res: Response, next: NextFunction);
    updateDeliveryPath(req: Request, res: Response, next: NextFunction);
}