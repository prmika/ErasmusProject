import { Request, Response, NextFunction } from 'express';

export default interface IPackagingController  {
  getPackaging(req: Request, res: Response, next: NextFunction);
  getAllPackages(req: Request, res: Response, next: NextFunction);
  createPackaging(req: Request, res: Response, next: NextFunction);
  updatePackaging(req: Request, res: Response, next: NextFunction);
}