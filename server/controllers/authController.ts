//@ts-nocheck
import { Request, Response, Errback, NextFunction  } from "express";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer";
import {User} from  '../models/User'
import passport from "../middlewares/passport/index"
import {createSecretToken, forgotPasswordToken} from "../middlewares/jwt/createSecretToken"
import {contactEmail} from "../utils/nodemailer"


export const Register = async  (req:Request, res:Response, next:NextFunction) => {
    try{ 
        User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err: string, user: Express.User) { 
            if (err) { 
                res.json({ success: false, message: "Your account could not be saved. Error: " + err }); 
            } 
            else { 
               
            req.login(user, (err) => { 
             
                    if (err) { 
                        res.json({ success: false, message: err }); 
                    } 
                    else { 
                        console.log(req.user)
                        res.json({ success: true, message: "Your account has been saved" }); 
                        // res.json({ success: true, message: "Your account has been saved" }); 
                    } 
                }); 
            } 
        }) 
        
    }catch(error){
     console.log(error)
    }

}


export const Login = async (req:Request, res:Response ) => {
    try {
       
        if(!req.body.username){ 
            res.json({success: false, message: "Username was not given"}) 
          } else { 
            if(!req.body.password){ 
              res.json({success: false, message: "Password was not given"}) 
            }else{ 
              passport.authenticate('local', function (err: any, user: Express.User, info: any) { 
                 if(err){ 
                   res.json({success: false, message: err}) 
                 } else{ 
                  if (! user) { 
                    res.json({success: false, message: 'username or password incorrect'}) 
                  } else{ 
                    req.login(user, function(err){ 
                      if(err){ 
                        res.json({success: false, message: err}) 
                      }else{ 
                    console.log(req.user)
                    const token = createSecretToken(user._id);
                     res.cookie("token", token, {
                         withCredentials: true,
                         httpOnly: false,
                       });
                         res.json({success:true, message:"Authentication successful" }); 
                      } 
                    }) 
                  } 
                 } 
              })(req, res); 
            } 
          } 
            
    
           
    }catch (error){
        console.log(error)
        
    }
   
}



export const ForgotPassword = async (req:Request, res:Response ) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({email});
    if (!user || user.length === 0) {
      res.json({
        success: false,
        message: "You  are not registered!",
      });

    } else {
   const token = forgotPasswordToken(user._id)
       await contactEmail.sendMail({
        from: '"Shop-here 👻" adeyemiemma45@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Forgot Password Link", // Subject line
        text: "Hello world?", // plain text body
        html: `We have received a request to reset your password. Please reset your password using the link below.",
          ${process.env.FRONTEND_URL}/resetpassword/${token},
          Reset Password`, // html body
      });
      res.json({success:true, message:"A password reset link has been sent to your email.", token:token }); 
    }
  }catch (error){
      console.log(error)
      
  }
 
}

export const UpdatePassword = async (req:Request, res:Response ) => {
  const {oldPassword, newPassword, username} = req.body
  try {
     
    User.findByUsername(username, (err, user) => {
      if (err) {
          res.send(err);
      } else {
          user.changePassword(oldPassword, 
          req.body.newPassword, function (err) {
              if (err) {
                  res.send(err);
              } else {
                  res.send('successfully change password')
              }
          });
      }
  });
         
  }catch (error){
      console.log(error)
      
  }
 
}

export const ResetPassword = async (req:Request, res:Response ) => {
  const {token, username, password} = req.body
  console.log(token)
  console.log(username, password)
  try {
     if (token){
      jwt.verify(token, process.env.FORGOT_PASSWORD!, async  (err, data) =>{
        if(err){
          return res.json({success:false,  message:`Incorrect token or expired!`})
      }
      User.findByUsername(username, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            user.setPassword(password, 
             function (err) {
                if (err) {
                    res.json({success:false, message:err});
                } else {
                   user.save()
                    res.json({success:true, message:"Password reset successfull"})
                }
            });
        }
    });
        
      })
     }else{
       return res.json({success:false, message:"Authentication Error"})
     }
    
         
  }catch (error){
      console.log(error)
      
  }
 
}


export const Logout = async (req:Request, res:Response, next:NextFunction ) => {
    if (req.user) {
         req.logout(function() {
             res.json({success:true, message: 'logging out' })
           });
    
    } else {
        res.json({success:false, message: 'no user to log out' })
    }
  
        
    
}







