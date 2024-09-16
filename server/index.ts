
import 'dotenv/config'

import session from 'express-session'
import MongoStore from 'connect-mongo'
import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression"
import bodyParser from "body-parser";
import cors from "cors";
import {connectDB} from './models/connectDb'
import authRoutes from "./routes/Auth"
import itemRoutes from "./routes/Items"
import cartRoutes from "./routes/Cart"
import orderRoutes from "./routes/Order"
import addressRoutes from "./routes/Address"
import passport from "./middlewares/passport/index"
import cookieParser from 'cookie-parser';
import path from 'path';


const app = express();

  

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.static('assets'));
app.use(compression())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
 app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
 app.use(bodyParser.json({ limit: "100mb"}));
 app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));



 app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://e-commerce-omega-pearl.vercel.app'
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
 



   app.use('/items', express.static(path.join(__dirname, '../assets')));
   app.use('/category', express.static(path.join(__dirname, '../assets')));
   


// app.use('/search', express.static(path.join(__dirname, 'assets')));
// app.use('/category/:id', express.static(path.join(__dirname, 'assets')));









 app.use("/", authRoutes );
 app.use("/", itemRoutes)
 app.use("/", cartRoutes)
 app.use("/", orderRoutes)
 app.use("/", addressRoutes)


 app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
 



 const startServer  = async () => {
    try{
  // eslint-disable-next-line no-undef
  await connectDB(process.env.MONGO_URL);

}catch (err){
    console.log(err)
}


}

startServer();