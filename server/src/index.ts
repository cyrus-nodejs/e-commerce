import dotenv from 'dotenv';
import app from './server';
import {connectDB} from '../models/connectDb'
const PORT = process.env.PORT || 3000;

dotenv.config()
const MONGO_URL = process.env.MONGO_URL
 const startServer  = async () => {
  try{
await connectDB(MONGO_URL!);
}catch (err){
  console.error('Failed to connect to MongoDB', err);
    process.exit(1);
}


}

 startServer();


  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});