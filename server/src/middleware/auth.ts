import { Express, Request, Response, NextFunction } from "express";
import { getAuthToken } from "../../utils";
import jwt from "jsonwebtoken";

export function authorisedOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getAuthToken(req);

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as string;
    next();
  });
}

export function unauthorisedOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getAuthToken(req);

  if (!token) return next();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (!err) return res.sendStatus(403);
    next();
  });
}