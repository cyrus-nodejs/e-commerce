
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
import path from 'path';


const app = express();



app.set('trust proxy', true);
app.use(cookieParser());

app.use(compression())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
 app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
 app.use(bodyParser.json({ limit: "100mb"}));
 app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
 import { dirname, join} from 'path';



 app.use((req, res, next) => {
  if (/(.ico|.js|.ts|.css|.jpg|.png|.map)$/i.test(req.path)) {
      next();
  } else {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.sendFile(path.join(__dirname, '../build',  ));
  }
});


 app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://shop-heree.netlify.app',
      'https://e-commerce-roan-three.vercel.app'
    ],
  }),
);



 app.use(
	session({
    name:process.env.SESSION_NAME!,
		secret:process.env.SESSION_SECRET!, //pick a random string to make the hash that is generated secure
		store: MongoStore.create({mongoUrl:process.env.MONGO_URL }),
     cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
		saveUninitialized: false ,//required
    resave: false, //required
   
	})
)
app.use(passport.initialize()); 
app.use(passport.session());

//  app.get('/items', express.static('assets'))
 

app.use(express.static(path.join(__dirname, "../dist"))); // put this line of code in app.js

  //  app.use('/items', express.static(path.join(__dirname, '../assets')));
  //  app.use('/category', express.static(path.join(__dirname, '../assets')));
   





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