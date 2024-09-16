"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrievePayment = exports.confirmPayment = exports.createPayment = exports.createOrder = exports.config = exports.orderDetails = exports.getAllOrder = exports.getCurrentOrder = void 0;
//@ts-nocheck
require("dotenv/config");
const stripe_1 = __importDefault(require("stripe"));
const Order_1 = require("../models/Order");
const Cart_1 = require("../models/Cart");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET, {
    apiVersion: "2024-06-20",
    appInfo: {
        name: "emall",
        url: "emall",
        version: "0.0.2",
    },
    typescript: true,
});
const getCurrentOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    try {
        const order = yield Order_1.Order.find({ owner: owner }).sort({ _id: -1 }).limit(1);
        if (order) {
            res.json({ success: true, message: "View order!", order: order });
        }
        else {
            res.json({ success: false, message: "No orders yet!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
exports.getCurrentOrder = getCurrentOrder;
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    try {
        const order = yield Order_1.Order.find({ owner: owner }).sort({ _id: -1 });
        if (order) {
            console.log(order);
            res.json({ success: true, message: "View order!", order: order });
        }
        else {
            res.json({ success: false, message: "No orders yet!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
exports.getAllOrder = getAllOrder;
const orderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield Order_1.Order.findOne({ _id: id });
        console.log(order);
        if (order) {
            res.json({ success: true, message: "View order!", order: order });
        }
        else {
            res.json({ success: false, message: "error!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
exports.orderDetails = orderDetails;
const config = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    if (publishableKey) {
        console.log(publishableKey);
        res.json({ success: true, message: "Pkey sent!", publishableKey: publishableKey,
        });
    }
    else {
        res.json({ success: false, message: "No Pkey!", publishableKey: publishableKey, });
    }
});
exports.config = config;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    const { gift, shipping, clientSecret } = req.body;
    console.log(gift, shipping);
    try {
        let cart = yield Cart_1.Cart.findOne({ owner });
        if (cart) {
            const order = yield Order_1.Order.create({
                owner,
                items: cart.items,
                bill: cart.bill + shipping + gift,
                giftwrapper: gift,
                deliveryfee: shipping,
                paymentid: clientSecret,
            });
            res.json({ success: true, message: "New order created!" });
        }
        else {
            res.json({ success: false, message: "order added!" });
        }
    }
    catch (err) {
    }
});
exports.createOrder = createOrder;
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    try {
        const order = yield Order_1.Order.find({ user }).sort({ _id: -1 }).limit(1);
        if (order) {
            let paymentIntent = yield stripe.paymentIntents.create({
                amount: order[0].bill * 100,
                currency: "usd",
            });
            if (!paymentIntent)
                throw Error('payment failed!');
            if (paymentIntent) {
                const filter = { payment: false };
                const update = { paymentid: paymentIntent.id };
                const doc = yield Order_1.Order.findOneAndUpdate(filter, update, { new: true, upsert: true, includeResultMetadata: true });
                doc.save;
                console.log(paymentIntent.client_secret);
                res.json({ success: true, message: "Payment intent created!", clientSecret: paymentIntent.client_secret });
            }
        }
        else {
            res.json({ sucess: false, message: "Payment error" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "Something went wrong" });
    }
});
exports.createPayment = createPayment;
const confirmPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    const { paymentIntent, paymentid } = req.body;
    console.log(paymentIntent);
    const order = yield Order_1.Order.findOne({ owner }).sort({ _id: -1 }).limit(1);
    try {
        if (order) {
            if (!paymentIntent)
                throw Error('Payment failed');
            if (paymentIntent.status == 'succeeded') {
                const filter = { payment: false };
                const update = { payment: true, paymentid: paymentIntent.id };
                const doc = yield Order_1.Order.findOneAndUpdate(filter, update, { new: true, upsert: true, includeResultMetadata: true });
                doc.save;
                yield Cart_1.Cart.findOneAndDelete({ owner });
                console.log(order);
                res.json({ success: true, message: "Payment  Validated Successfully!" });
            }
            else {
                res.json({ success: false, message: " Payment not validated!" });
            }
        }
        else {
            res.json({ sucess: false, message: "No cart exist" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "Something went wrong" });
    }
});
exports.confirmPayment = confirmPayment;
const retrievePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const { orderId } = req.body;
    try {
        const order = yield Order_1.Order.findOne({ _id: orderId });
        const paymentId = order.paymentid;
        console.log(paymentId);
        if (order) {
            let paymentIntent = yield stripe.paymentIntents.retrieve(`${paymentId}`);
            if (!paymentIntent)
                throw Error('payment failed!');
            if (paymentIntent) {
                res.json({ success: true, message: `Transaction status:${paymentIntent.status}, Amount Paid:$${paymentIntent.amount}` });
            }
        }
        else {
            res.json({ sucess: false, message: "Order not found" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "Something went wrong" });
    }
});
exports.retrievePayment = retrievePayment;
