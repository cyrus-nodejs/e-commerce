import express from "express"
import { getCart, addToCart, deleteFromCart, decreaseCartQty, 
    addCartQty, clearCart,  } from "../controllers/cartController";
import { userAuthorization } from "../middlewares/jwt/verifyToken";

const router = express.Router();


router.get("/getcart",  getCart);
router.post("/addtocart",    addToCart);
router.post("/reducecart",  userAuthorization,  decreaseCartQty);
router.post("/addcart",  userAuthorization,  addCartQty);
router.post("/deletecart",  userAuthorization, deleteFromCart);
router.get("/clearCart",  userAuthorization,  clearCart);






export default router;