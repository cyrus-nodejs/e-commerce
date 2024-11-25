//@ts-nocheck
// import {User} from "../../models/User"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { Request, Response, Errback, NextFunction  } from "express";


 export const userVerification = (req:Request,  res:Response, next:NextFunction) => {
    const token = req.cookies.token
//    console.log(`verifytoken => ${token}`)
    if (!token){
        return res.json({success:false,  message:"Login required!"})
    }
    jwt.verify(token, process.env.TOKEN_KEY!, async (err:any, data:any) => {
        if(err){
            return res.json({success:false,  message:`Authorization require`})
        
        }else{
            const user = req.user
            console.log(`THIS is a sure ${user}`)
            if (user) return res.json({ success: true, message:`Hi ${user.username}`, user: user })
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
            if (user) return res.json({ success: true, message:`Welcome ${user.username}`, user: user.username })
                else return res.json({ success: false, message:"Not Authorized!" })
        }
   
    })
  next()  
}

