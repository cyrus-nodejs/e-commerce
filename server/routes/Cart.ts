import express from "express"
import { getCart, addToCart, deleteFromCart, decreaseCartQty, 
    addCartQty, clearCart,  } from "../controllers/Cart";
import { userAuthorization } from "../middlewares/jwt/verifyToken";

const router = express.Router();


router.get("/getcart", userAuthorization,  getCart);
router.get("/clearCart",    userAuthorization,  clearCart);


router.post("/addtocart",  userAuthorization,    addToCart);
router.post("/reducecart",  userAuthorization,  decreaseCartQty);
router.post("/addcart",  userAuthorization,  addCartQty);
router.post("/deletecart",  userAuthorization,  deleteFromCart);







export default router;