// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';

// let mongo: MongoMemoryServer;

// beforeAll(async () => {
//   mongo = await MongoMemoryServer.create();
//   const uri = mongo.getUri();
//   await mongoose.connect(uri);
// }, 30000);

// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();
//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
// }, 30000);

// afterAll(async () => {
//   await mongoose.connection.close();
//   await mongo.stop();
// },30000);
