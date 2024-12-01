
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { Request, Response, Errback, NextFunction  } from "express";


 export const userVerification = (req:Request,  res:Response, next:NextFunction) => {
    const token = req.cookies.token
   console.log(`verifytoken => ${token}`)
    if (!token){
        return res.json({success:false,  message:"No Acess Token! "})
    }
    jwt.verify(token, process.env.TOKEN_KEY!, async (err:any, user:any) => {
        if(err){
            return res.json({success:false,  message:`Invalid Token!`})
        }else{
console.log(req.user)
            if (user) return res.json({ success: true, message:`Hi ${user}`, user:req.user })
                else return res.json({ success: false, message:"No Loggedin!!" })
        }
   
    })
  next()  
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

