import 'dotenv/config'
import jwt from 'jsonwebtoken'

 export const createSecretToken = (id:any) => {
return jwt.sign({id}, process.env.TOKEN_KEY!,  {
  expiresIn: Math.floor(Date.now() / 1000) + (60 * 24* 60),
})
}

export const forgotPasswordToken = (id:any) => {
  return jwt.sign({id}, process.env.FORGOT_PASSWORD!,  {
    expiresIn:'15m',
  })
  }


