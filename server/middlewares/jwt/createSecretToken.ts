
import jwt from 'jsonwebtoken'

 export const createSecretToken = (data:any) => {
return jwt.sign({data}, process.env.TOKEN_KEY,  {expiresIn: Math.floor(Date.now() / 1000) + (60 * 96* 60),})
}

export const forgotPasswordToken = (id:any) => {
  return jwt.sign({id}, process.env.FORGOT_PASSWORD!,  {
    expiresIn:'15m',
  })
  }


