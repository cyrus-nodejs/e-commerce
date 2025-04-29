
import express from "express"
import {createAddress, getAddress, updateAddress} from "../controllers/Address";
import { userAuthorization } from "../middlewares/jwt/verifyToken";
const router = express.Router();
 router.get("/getaddress", userAuthorization,  getAddress);
router.post("/createaddress", userAuthorization, createAddress);
router.post("/updateaddress", userAuthorization, updateAddress);


export default router;