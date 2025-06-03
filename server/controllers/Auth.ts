import { Request, Response, NextFunction } from 'express';

import { User, IUser } from '../models/User'
import passport from "../middlewares/passport/index"
import { createSecretToken, forgotPasswordToken } from "../middlewares/jwt/createSecretToken"
import { contactEmail } from "../utils/nodemailer"
import dotenv from 'dotenv';
dotenv.config()

//Save  & register User to database
export const Register = async (req: Request, res: Response, next: NextFunction) => {
 
  try {
    User.register(new User({ email: req.body.email, username: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname}), req.body.password, function (err: string, user: Express.User) {
      
      if (err) {
       return res.json({ success: false, message: "Your account could not be saved. Error: " + err });
      }
      else {
        req.login(user, (err: any) => {
          
        if (err) {
          return  res.json({ success: false, message: err });
        }
        else {
        console.log(req.user)
        return  res.status(200).json({ success: true, message: "Your account has been saved" });
            
      }
      });
      }
    })

  } catch (error) {
    console.log(error)
    return res.json({sucess:'false', message:"something went wrong1"})

  }

}

//authenticate User

export const Login = async (req: Request, res: Response) => {
  try {
    if (!req.body.username) {
      res.json({ success: false, message: "Username was not given" })
    } else {

      if (!req.body.password) {
       return res.json({ success: false, message: "Password was not given" })
      } else {
        passport.authenticate('local', async (err: any, user: any, info: any) => {
          if (err) {
          return  res.status(402).json({ success: false, message: err })
          } else {
            if (!user) {
           return   res.json({ success: false, message: 'username or password incorrect' })
            } else {
              req.login(user, async (err: any) => {
                if (err) {
                return  res.status(403).json({ success: false, message: err })
                } else {
                  console.log(`Login my ${req.user}`)
                  const eToken = createSecretToken(req.user);
                  res.cookie(process.env.TOKEN_NAME, eToken, { httpOnly:true, secure:true, sameSite:"none" });
                  console.log(eToken)
                  return   res.status(200).json({ success: true, message: "Authentication successful",  user: req.user , eToken:eToken  });
                }
              })
            }
          }
        })(req, res);
      }
    }



  } catch (error) {
    console.log(error)

  }

}

 
// GET /auth/google
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
   session: false, // Important for JWT
})

//Google auth Callback
export const googleAuthCallback = (req:Request, res:Response, next:NextFunction) => {
  passport.authenticate('google', { session: true }, (err, user) => {

    if (err || !user){
    console.log(err)
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth`);
    }

    const eToken = createSecretToken(user);
    // 🔐 Set token in cookie
    res.cookie(process.env.TOKEN_NAME, eToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
   
    return res.redirect(`${process.env.FRONTEND_URL}`);

  })(req, res, next);
};


 //Get authorized User
export const  getAuthUser = async (req:Request,  res:Response) => {

  if (!req.user){
   return res.json({ success: false, message:`No User Found`})
  }
console.log(`my ${req.user}`)
 return  res.json({ success: true, message:`Welcome ${req.user}`, user: req.user })

  }
  

export const ForgotPassword = async (req: Request, res: Response) => {
   const email = req.body.email;
  const user = await User.findOne({ email });
    
  try {
   
 if (!user ) {
  return   res.json({success: false,message: "You  are not registered!"});
  } 
else {
// Create forgot password token
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
user.token = token
user.save()
return res.json({ success: true, message: "A password reset link has been sent to your email." });
  
}
  } catch (error) {
    console.log(error)
    return res.json({sucess:'false', message:"something went wrong"})

  }

}
// Validate forgot password token & reset to new password
export const ResetPassword = async (req: Request, res: Response) => {
const { token, password } = req.body

try {
    const user = await User.findOne({token: token });
    if (!user) return res.status(404).send('User not found');

    await new Promise<void>((resolve, reject) => {
      user.setPassword(password, (err) => {
        if (err) return reject(err);
        user.save().then(() => resolve()).catch(reject);
      });
    });
       User.findOneAndDelete({token:token})
    res.status(201).json({message:'Password reset'});

  } catch (err) {
    res.status(500).send(err);
  }

}


// Change old password
export const UpdatePassword = async (req: Request, res: Response) => {

  const { oldPassword, newPassword } = req.body
   const user = req.user as IUser
   const userId = user._id

if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({message:'Unauthorized'});
  }

  

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Authenticate with the old password
    const isValid = await new Promise<boolean>((resolve, reject) => {
      user?.authenticate(oldPassword, (err, user) => {
        if (err || !user) return resolve(false);
        resolve(true);
      });
    });

    if (!isValid) return res.status(403).json({message:'Incorrect current password'});

    await new Promise<void>((resolve, reject) => {
      user?.setPassword(newPassword, (err) => {
        if (err) return reject(err);
        user.save().then(() => resolve()).catch(reject);
      });
    });

    res.status(200).json({message:'Password updated'});
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"Network error!"});
  }

}


// log out req.user
export const Logout = async (req: Request, res: Response, next:NextFunction) => {
  
  req.logout(err => {
    if (err) return next(err);

    //  Destroy server session 
    req.session.destroy(() => {
      //  Clear session cookie 
      res.clearCookie(process.env.SESSION_NAME);
      //  Clear JWT cookie (assuming it's called 'token')
      res.clearCookie(process.env.TOKEN_NAME, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      res.status(200).json({ message: 'Logged out successfully' });
    });
  });


}

export const Servicom = async (req: Request, res: Response) => {
  console.log("Welcome to Servicom")
 return res.send("Welcome to Servicom")

}







