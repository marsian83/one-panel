import { User } from "../custom";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

export {};
