
import express from "express"
import {createAddress, getAddress, updateAddress} from "../controllers/addressControllers";

const router = express.Router();
 router.get("/getaddress", getAddress);
router.post("/createaddress", createAddress);
router.post("/updateaddress", updateAddress);


export default router;