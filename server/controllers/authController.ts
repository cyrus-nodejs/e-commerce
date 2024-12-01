
import {  NextFunction  } from "express";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import {User} from  '../models/User'
import passport from "../middlewares/passport/index"
import {createSecretToken, forgotPasswordToken} from "../middlewares/jwt/createSecretToken"
import {contactEmail} from "../utils/nodemailer"


export const Register = async  (req:any, res:any, next:NextFunction) => {
    try{ 
        User.register(new User({ email: req.body.email, username:req.body.email, firstname:req.body.firstname, lastname:req.body.lastname }), req.body.password, function (err: string, user: Express.User) { 
            if (err) { 
                res.json({ success: false, message: "Your account could not be saved. Error: " + err }); 
            } 
            else { 
               
            req.login(user, (err: any) => { 
             
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


export const Login = async (req:any, res:any ) => {
    try {
       
        if(!req.body.username){ 
            res.json({success: false, message: "Username was not given"}) 
          } else { 
            if(!req.body.password){ 
              res.json({success: false, message: "Password was not given"}) 
            }else{ 
              passport.authenticate('local', async (err: any, user: any, info: any)  => { 
                 if(err){ 
                   res.json({success: false, message: err}) 
                 } else{ 
                  if (! user) { 
                    res.json({success: false, message: 'username or password incorrect'}) 
                  } else{ 
                    req.login(user, async (err: any) => { 
                      if(err){ 
                        res.json({success: false, message: err}) 
                      }else{ 
                    console.log(`Login my ${req.user}`)
                    const token = createSecretToken(JSON.stringify(user));
                     res.cookie("token", token, {
                      secure:true,
                         withCredentials: true,
                         httpOnly: true,
                         sameSite: "none",
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



export const ForgotPassword = async (req:any, res:any ) => {
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

export const UpdatePassword = async (req:any, res:any  ) => {
  const {oldPassword, newPassword, username} = req.body
  try {
     
    User.findByUsername(username, (err: any, user: { changePassword: (arg0: any, arg1: any, arg2: (err: any) => void) => void; }) => {
      if (err) {
          res.send(err);
      } else {
          user.changePassword(oldPassword, 
          req.body.newPassword, function (err: any) {
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

export const ResetPassword = async (req:any, res:any  ) => {
  const {token, username, password} = req.body
  console.log(token)
  console.log(username, password)
  try {
     if (token){
      jwt.verify(token, process.env.FORGOT_PASSWORD!, async  (err: any, data: any) =>{
        if(err){
          return res.json({success:false,  message:`Incorrect token or expired!`})
      }
      User.findByUsername(username, (err: any, user: { setPassword: (arg0: any, arg1: (err: any) => void) => void; save: () => void; }) => {
        if (err) {
            res.send(err);
        } else {
            user.setPassword(password, 
             function (err: any) {
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


export const Logout = async (req:any, res:any ,  ) => {
    if (req.user) {
         req.logout(function() {
             res.json({success:true, message: 'logging out' })
           });
    
    } else {
        res.json({success:false, message: 'no user to log out' })
    }
  
        
    
}

export const Servicom = async (req:any, res:any  ) => {
 console.log("Welcome to Servicom")
 res.send("Welcome to Servicom")
      
}







