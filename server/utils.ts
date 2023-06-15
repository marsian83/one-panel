import { Request } from "express";

export function getAuthToken(req: Request): string | false {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return false;
  return token;
}
