
import { Users, IFile } from '../server/types/@types';
import { MongoMemoryServer } from 'mongodb-memory-server';
import 'express';

declare global {
  var mongo: MongoMemoryServer;

  namespace Express {
    interface Request {
      user?: Users;
       file?: IFile;
  
    }
  }

  namespace cloudinary {
    interface uploader {
      upload: () => void;
    }
  }
}

export {};