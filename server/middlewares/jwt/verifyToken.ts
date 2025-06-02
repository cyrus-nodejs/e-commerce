
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { Request, Response, Errback, NextFunction  } from "express";

//Verify User Role
export const verifyRole = (roles: string | any[]) => {
    return (req:any, res:any, next:any) => {
      if (!roles.includes(req.user?.role)) {
        return res.json({success:false, message: `Access denied. ${req.user.role } access level required!` });
      }
      next();
    };
  };


  
  //Authorize Users
 export const userAuthorization = (req:Request,  res:Response, next:NextFunction) => {
    let eToken = req.cookies.eToken
      // Fallback to Authorization header if not in cookies
  if (!eToken && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    eToken = req.headers.authorization.split(' ')[1];
  }
   console.log(`verifytoken => ${eToken}`)
    if (!eToken){
      console.log("No Access Token! ")
        return res.json({success:false,  message:'No access Token'})
    }
    jwt.verify(eToken, process.env.TOKEN_KEY, async (err:any, user:any) => {
        if(err){
            return res.json({success:false,  message:`Invalid or expired token!`})
        }
        
        console.log(user)
          req.user = user.data;
     
      
           next()
            
    })
 
}



