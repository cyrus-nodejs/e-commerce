import { Users, IFile } from '../server/types/@types';
import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  var mongo: MongoMemoryServer;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: Users;
    file?: IFile;
    files?: IFile[];
  }
}

declare namespace cloudinary {
  interface uploader {
    upload: () => void;
  }
}

export {};