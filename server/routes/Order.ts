import express from "express"
import { getAllOrder , getCurrentOrder, orderDetails, createPayment ,confirmPayment,
    retrievePayment, createOrder, config } from "../controllers/orderController";
    import { verifyRole } from "../middlewares/jwt/verifyToken";
import { userAuthorization} from "../middlewares/jwt/verifyToken";
const router = express.Router();
 router.get("/getallorders", userAuthorization, getAllOrder);
 router.get("/currentorder", userAuthorization, getCurrentOrder);
 router.get("/orderdetails/:id", userAuthorization,  orderDetails);
router.get("/config", userAuthorization, config);

router.post("/create-payment-intent", userAuthorization,  createPayment);
router.post("/createorder",  userAuthorization, createOrder);
router.post("/confirmpayment", userAuthorization,   confirmPayment);
router.post("/retrievepayment", userAuthorization, verifyRole([' customer service']), retrievePayment);









export default router;