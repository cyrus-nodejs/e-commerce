

import dotenv from 'dotenv';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression"
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "../routes/Auth"
import itemRoutes from "../routes/Items"
import cartRoutes from "../routes/Cart"
import orderRoutes from "../routes/Order"
import reviewRoutes from '../routes/Review'
import addressRoutes from "../routes/Address"
import adminRoutes from '../routes/Admin'
import passport from "../middlewares/passport/index"
import cookieParser from 'cookie-parser';

dotenv.config()

 const app = express();


// Cors configuration for server  Local host & web hosting services
const corsOptions = {
  //  origin: process.env!.FRONTEND_URL2,
  origin:process.env.FRONTEND_URL,
 credentials: true, 
 optionSuccessStatus: 200,
 methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));



 

app.use(cookieParser());

app.use(compression())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
 app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
 app.use(bodyParser.json({ limit: "100mb"}));
 app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
 



 


app.get("/", (req, res)=>{
  console.log(`User is login ${req.user}`)

})


  app.set('trust proxy', 1)

 app.use(
	session({
    name:process.env.SESSION_NAME,
		secret:process.env.SESSION_SECRET, //pick a random string to make the hash that is generated secure
		store: MongoStore.create({mongoUrl:process.env.MONGO_URL}),
		saveUninitialized: false ,//required
    resave: false, //required
    cookie: { httpOnly:true, secure:true, sameSite:"none"  } 
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
 app.use("/", reviewRoutes)




 export default app;