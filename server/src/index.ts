

import dotenv from 'dotenv';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression"
import bodyParser from "body-parser";
import cors from "cors";
import {connectDB} from '../models/connectDb'
import authRoutes from "../routes/Auth"
import itemRoutes from "../routes/Items"
import cartRoutes from "../routes/Cart"
import orderRoutes from "../routes/Order"
import addressRoutes from "../routes/Address"
import adminRoutes from '../routes/Admin'
import passport from "../middlewares/passport/index"
import cookieParser from 'cookie-parser';

dotenv.config()

 const app = express();




app.use(cookieParser());

app.use(compression())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
 app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
 app.use(bodyParser.json({ limit: "100mb"}));
 app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
 

 
// Example allowed origins for production
const allowedOrigins = [process.env!.FRONTEND_URL];
 const corsOptions = process.env.NODE_ENV !== 'development'
  ? {
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true, // If you're using cookies or sessions
    }
  : {
      origin: true, // Allow all origins in development
      credentials: true,
    };

app.use(cors(corsOptions));





 

 


app.get("/", (req, res)=>{
  console.log(`User is login ${req.user}`)
})


  app.set('trust proxy', 1)

 app.use(
	session({
    name:process.env.SESSION_NAME!,
		secret:process.env.SESSION_SECRET!, //pick a random string to make the hash that is generated secure
		store: MongoStore.create({mongoUrl:process.env.MONGO_URL}),
     cookie: {
       maxAge: 24 * 60 * 60 * 1000, 
      //  httpOnly: true, sameSite: "none", secure: true 
    },
		saveUninitialized: false ,//required
    resave: false, //required
   
	})
)
app.use(passport.initialize()); 
app.use(passport.session());





 app.use("/", authRoutes );
 app.use("/", itemRoutes)
 app.use("/", cartRoutes)
 app.use("/", orderRoutes)
 app.use("/", addressRoutes)
 app.use("/", adminRoutes)


const MONGO_URL = process.env.MONGO_URL
 const startServer  = async () => {
  try{
await connectDB(MONGO_URL);
}catch (err){
  console.log(err)
}


}

 startServer();

 app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
 
  

 export default app;