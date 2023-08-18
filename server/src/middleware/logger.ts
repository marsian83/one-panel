import { NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} called on ${req.url}`);

  next();
}
