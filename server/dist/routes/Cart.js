"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.get("/cart", cartController_1.getCart);
router.post("/cart", cartController_1.addToCart);
router.post("/reducecart", cartController_1.decreaseCartQty);
router.post("/addcart", cartController_1.addCartQty);
router.post("/deletecart", cartController_1.deleteFromCart);
router.get("/clearCart", cartController_1.clearCart);
exports.default = router;
