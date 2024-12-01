
import 'dotenv/config'

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
import passport from "../middlewares/passport/index"
import cookieParser from 'cookie-parser';



const app = express();




app.use(cookieParser());

app.use(compression())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
 app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
 app.use(bodyParser.json({ limit: "100mb"}));
 app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
 


console.log(process.env!.FRONTEND_URL)

 const corsOptions = {
   origin: process.env!.FRONTEND_URL,
  credentials: true, 
  optionSuccessStatus: 200,
  Headers: true,
  exposedHeaders: 'Set-Cookie',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Authorization'
  ]
}
app.use(cors(corsOptions))

app.get("/", (req, res)=>{
  console.log(`User is login ${req.user}`)
})



 const cookieParams = {maxAge: 24 * 60 * 60 * 1000, httpOnly: true,  secure: true };
 app.use(
	session({
    name:process.env.SESSION_NAME!,
		secret:process.env.SESSION_SECRET!, //pick a random string to make the hash that is generated secure
		store: MongoStore.create({mongoUrl:process.env.MONGO_URL }),
     cookie: cookieParams,
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


 const server = app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
 
   server.keepAliveTimeout = 110 * 1000;
   server.headersTimeout = 120 * 1000;
   

 const startServer  = async () => {
    try{
  // eslint-disable-next-line no-undef
  await connectDB(process.env.MONGO_URL);

}catch (err){
    console.log(err)
}


}

startServer();