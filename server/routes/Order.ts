import express from "express"
import { getAllOrder , getCurrentOrder, orderDetails, createPayment ,confirmPayment,
    retrievePayment, createOrder, config } from "../controllers/orderController";

import { userVerification } from "../middlewares/jwt/verifyToken";
const router = express.Router();
 router.get("/getallorders", getAllOrder);
 router.get("/currentorder", getCurrentOrder);
 router.get("/orderdetails/:id",  orderDetails);
router.get("/config", config);
router.get("/create-payment-intent",  createPayment);

router.post("/createorder",  createOrder);
router.post("/confirmpayment",  confirmPayment);
router.post("/retrievepayment",  retrievePayment);









export default router;