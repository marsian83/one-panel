import { Express, Request, Response, NextFunction } from "express";
import { getAuthTokenFromHeader } from "../../utils";
import jwt from "jsonwebtoken";
import { User } from "../types/custom";

export function authorisedOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getAuthTokenFromHeader(req);

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(205).send({ invalidToken: true });

    req.user = user as User;

    if (!req.user) return res.status(205).send({ invalidToken: true });

    next();
  });
}

export function unauthorisedOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getAuthTokenFromHeader(req);

  if (!token) return next();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (!err) return res.sendStatus(403);
    next();
  });
}
