import express from "express"
import { getCart, addToCart, deleteFromCart, decreaseCartQty, 
    addCartQty, clearCart,  } from "../controllers/cartController";


const router = express.Router();


router.get("/cart", getCart);
router.post("/cart",  addToCart);
router.post("/reducecart",  decreaseCartQty);
router.post("/addcart",  addCartQty);
router.post("/deletecart",  deleteFromCart);
router.get("/clearCart",  clearCart);






export default router;