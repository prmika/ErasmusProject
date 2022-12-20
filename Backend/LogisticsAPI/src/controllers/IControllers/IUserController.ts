import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  getUser(req: Request, res: Response, next: NextFunction);
}