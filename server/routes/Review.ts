
import express from "express"
import {createReview, } from "../controllers/Review";
import { userAuthorization } from "../middlewares/jwt/verifyToken";
const router = express.Router();


 router.post("/reviews", userAuthorization,   createReview);



export default router;