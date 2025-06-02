// types/express/index.d.ts
// import { User, IFile } from './@types';
import {User} from '../../models/User'


declare global {
  namespace Express {
    interface Request {
      user?: User;
      files: IFile;
    }
  }
}



declare global {
  namespace cloudinary {
    interface uploader {
      upload:() => void
    }
  }
}


export {};