"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.get("/getorder", orderController_1.getAllOrder);
router.get("/invoice", orderController_1.getCurrentOrder);
router.get("/config", orderController_1.config);
router.get("/orderdetails/:id", orderController_1.orderDetails);
router.get("/create-payment-intent", orderController_1.createPayment);
router.post("/createorder", orderController_1.createOrder);
router.post("/confirmpayment", orderController_1.confirmPayment);
router.post("/retrievepayment", orderController_1.retrievePayment);
exports.default = router;
