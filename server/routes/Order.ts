import express from "express"
import { getAllOrder ,  getCurrentOrder, getOrderById, createPayment ,confirmPayment,
    retrievePayment } from "../controllers/Order";
    import { verifyRole } from "../middlewares/jwt/verifyToken";
import { userAuthorization} from "../middlewares/jwt/verifyToken";
const router = express.Router();
 router.get("/getallorders", userAuthorization, getAllOrder);
 router.get("/currentorder", userAuthorization, getCurrentOrder);
 router.get("/orderdetails/:id", userAuthorization,  getOrderById);

router.get("/confirmpayment/:paymentIntent", userAuthorization,   confirmPayment);

router.post("/create-payment-intent", userAuthorization,  createPayment);

router.post("/retrievepayment", userAuthorization, verifyRole([' customer service']), retrievePayment);









export default router;