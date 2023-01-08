import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  getUser(req: Request, res: Response, next: NextFunction);
  getAllUsers(req: Request, res: Response, next: NextFunction);
  anonymizeUser(req: Request, res: Response, next: NextFunction);
  updateUser(req: Request, res: Response, next: NextFunction);
}