import express from 'express';

const router = express.Router();
import {Servicom, Register, Login, Logout, ForgotPassword, ResetPassword, UpdatePassword } from "../controllers/authController";
import {userVerification} from "../middlewares/jwt/verifyToken"

router.get("/", Servicom)
 router.post("/register", Register );
router.post("/login", Login );
router.post("/logout", Logout );
  router.post('/',  userVerification  )
  router.post('/forgotpassword',  ForgotPassword )
  router.post('/resetpassword',  ResetPassword  )
  router.post('/updatepassword',  UpdatePassword  )
 
  








export default router;