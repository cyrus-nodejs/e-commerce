// types/express/index.d.ts
 import { User, IFile } from '../server/types/@types';
import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  var mongo: MongoMemoryServer;
}



declare global {
  namespace Express {
    interface Request {
      user?: User;
      file?: IFile;
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