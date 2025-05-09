
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
        return res.json({success:false,  message:''})
    }
    jwt.verify(eToken, process.env.TOKEN_KEY, async (err:any, user:any) => {
        if(err){
            return res.json({success:false,  message:`Invalid or expired token!`})
        }
         console.log("user contains " + JSON.stringify(user));
          req.user = user.data;
        console.log(req.user)
           next()
            
    })
 
}



export const forgotPasswordVerification = (req:Request,  res:Response, next:NextFunction) => {
    const token = req.cookies.token
//    console.log(`verifytoken => ${token}`)
    if (!token){
        return res.json({success:false,  message:"Not Authorized! Token does not exist"})
    }
    jwt.verify(token, process.env.TOKEN_KEY!, async (err:any, data:any) => {
        if(err){
            return res.json({success:false,  message:`Cannot verify token + ${err}`})
        
        }else{
            const user = req.user
            if (user) return res.json({ success: true, message:`Welcome ${user}`, user: user })
                else return res.json({ success: false, message:"Not Authorized!" })
        }
   
    })
  next()  
}

