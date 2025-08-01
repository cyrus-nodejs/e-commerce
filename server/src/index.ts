import dotenv from 'dotenv';
import app from './server';
import {connectDB} from '../models/connectDb'

import cron from 'node-cron';
import axios from 'axios';

const PORT = process.env.PORT || 3000;

cron.schedule('*/1440 * * * *', async () => {
  try {
    const url = process.env.SERVER_URL!;
    await axios.get(url);
    console.log('Ping sent to:', url);
  } catch (err) {
    console.error('Ping failed', err);
  }
});
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