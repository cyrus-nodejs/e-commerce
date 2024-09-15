//@ts-nocheck
import { IFile, user } from "./types/@types";
import { UserRequest } from "./types/@types";

declare global {
  namespace Express {
    interface Request {
      files: IFile;
      user: user[] ;
    }
  }
}

