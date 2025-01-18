import express from 'express';

const router = express.Router();
import { Register, Login, Logout, getAuthUser, ForgotPassword, ResetPassword, UpdatePassword } from "../controllers/authController";
import {userAuthorization} from "../middlewares/jwt/verifyToken"




 

router.post("/register", Register );
router.post("/login", Login );
router.post("/logout", Logout );
  router.post('/forgotpassword',  ForgotPassword )
  router.post('/resetpassword',  ResetPassword  )
  router.post('/updatepassword',  UpdatePassword  )
  router.post('/', userAuthorization,  getAuthUser  )







export default router;