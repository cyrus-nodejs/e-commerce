
import { Users, IFile } from '../server/types/@types';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Express } from 'express';
declare global {
  var mongo: MongoMemoryServer;

  namespace Express {
    interface Request {
      user?: Users;
       file?: IFile;
      files?:IFile[];
    }
  }

  namespace cloudinary {
    interface uploader {
      upload: () => void;
    }
  }
}

export {};