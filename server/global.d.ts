
 import { User, IFile } from '../server/types/@types';
import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  var mongo: MongoMemoryServer;
}

export {};


declare global {
  namespace Express {
    interface Request {
      user?: User;
      
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