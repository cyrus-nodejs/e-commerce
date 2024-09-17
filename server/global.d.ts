
import { IFile, USER } from "./types/@types";


declare global {
  namespace Express {
    interface Request {
      files: IFile;
      user: USER ;
    }
  }
}

