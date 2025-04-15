import mongoose from "mongoose"

export const connectDB = async  (url:string) : Promise<typeof mongoose> => {
//   console.time('mongoose_connect');
//  await  mongoose.connect(url, 
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000, // reduces wait time for server selection
//     connectTimeoutMS: 10000,        // max time allowed for initial connection
//     directConnection: true          // skip replica set discovery if not needed
//   }
//  ).then(() => console.log("Database Connected"))

//    .catch((err) => console.log(err))
// // const conn = await mongoose.createConnection(url, { maxPoolSize: 10 }).asPromise();

// // conn.on('connected', () => console.log('connected'));
// // conn.on('open', () => console.log('open'));
// // conn.on('disconnected', () => console.log('disconnected'));
// // conn.on('reconnected', () => console.log('reconnected'));
// // conn.on('disconnecting', () => console.log('disconnecting'));
// // conn.on('close', () => console.log('close'));
try {
  console.time('mongoose_connect');

  const connection =  mongoose.connect(url);
  console.timeEnd('mongoose_connect');
  console.log('🟢 Connected to MongoDB');
  return connection;
} catch (error) {
  console.error('🔴 MongoDB connection error:', error);
  throw error;
}
}

