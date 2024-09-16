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
Object.defineProperty(exports, "__esModule", { value: true });
exports.decreaseCartQty = exports.addCartQty = exports.clearCart = exports.deleteFromCart = exports.addToCart = exports.getCart = void 0;
//@ts-nocheck
const Cart_1 = require("../models/Cart");
const Item_1 = require("../models/Item");
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user.id;
    try {
        let cart = yield Cart_1.Cart.findOne({ owner });
        if (cart && cart.items.length > 0) {
            res.json({ success: true, message: "View cart!", cart: cart });
        }
        else {
            res.json({ success: false, message: "empty cart!", cart: cart });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
exports.getCart = getCart;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    const { itemId, price, title, image, quantity } = req.body;
    try {
        const cart = yield Cart_1.Cart.findOne({ owner });
        const item = yield Item_1.Item.findOne({ _id: itemId });
        if (!item) {
            res.status(404).send({ message: "item not found!" });
        }
        // const price = item.price
        // const title = item.title
        // const quantity = item.unit
        //if cart already exist for user:
        if (cart) {
            let itemIndex = cart.items.findIndex(item => item.itemId == itemId);
            //check if product exists or not
            if (itemIndex > -1) {
                const product = cart.items[itemIndex];
                product.quantity += quantity;
                cart.bill = cart.items.reduce((total, curr) => {
                    return total + curr.quantity * curr.price;
                }, 0);
                cart.items[itemIndex] = product;
                yield cart.save();
                res.json({ success: true, message: "Item added to Cart!" });
            }
            else {
                cart.items.push({ itemId, title, image, quantity, price });
                cart.bill = cart.items.reduce((total, curr) => {
                    return total + curr.quantity * curr.price;
                }, 0);
                yield cart.save();
                res.json({ success: true, message: "Item added to Cart!", });
            }
        }
        else {
            //no cart exists, create one
            const newCart = Cart_1.Cart.create({
                owner,
                items: [{ itemId, title, image, quantity, price }],
                bill: quantity * price
            });
            return res.json({ success: true, message: "Item added to Cart!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("something went wrong");
    }
});
exports.addToCart = addToCart;
const deleteFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    const { itemId } = req.body;
    try {
        let cart = yield Cart_1.Cart.findOne({ owner });
        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
        console.log(itemIndex);
        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            cart.bill -= item.quantity * item.price;
            if (cart.bill < 0) {
                cart.bill = 0;
            }
            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((total, curr) => {
                return total + curr.quantity * curr.price;
            }, 0);
            cart = yield cart.save();
            res.status(200).send(cart);
        }
        else {
            res.json({ success: false, message: "item not found!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send();
    }
});
exports.deleteFromCart = deleteFromCart;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    try {
        let cart = yield Cart_1.Cart.findOne({ owner });
        if (cart) {
            yield Cart_1.Cart.findOneAndDelete({ owner });
            res.json({ success: true, message: "Cart cleared!" });
        }
        else {
            res.json({ success: true, message: "No cart exists!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send();
    }
});
exports.clearCart = clearCart;
const addCartQty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    const { itemId } = req.body;
    try {
        const cart = yield Cart_1.Cart.findOne({ owner });
        const item = yield Item_1.Item.findOne({ _id: itemId });
        if (!item) {
            res.status(404).send({ message: "item not found!" });
        }
        if (cart) {
            let itemIndex = cart.items.findIndex(item => item.itemId == itemId, console.log(item.id, itemId));
            //check if product exists or not
            console.log(itemIndex);
            if (itemIndex > -1) {
                const product = cart.items[itemIndex];
                product.quantity += 1;
                cart.bill = cart.items.reduce((total, curr) => {
                    return total + curr.quantity * curr.price;
                }, 0);
                cart.items[itemIndex] = product;
                yield cart.save();
                res.json({ success: true, message: "Item added to Cart!", cart: cart });
            }
        }
        else {
            res.status(404);
            throw new Error("Item not found");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("something went wrong");
    }
});
exports.addCartQty = addCartQty;
const decreaseCartQty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    const { itemId } = req.body;
    try {
        const cart = yield Cart_1.Cart.findOne({ owner });
        const item = yield Item_1.Item.findOne({ _id: itemId });
        if (!item) {
            res.status(404).send({ message: "item not found!" });
        }
        if (cart) {
            let itemIndex = cart.items.findIndex(item => item.itemId == itemId, console.log(item.id, itemId));
            //check if product exists or not
            if (itemIndex > -1) {
                const product = cart.items[itemIndex];
                product.quantity += -1;
                cart.bill = cart.items.reduce((total, curr) => {
                    return total + curr.quantity * curr.price;
                }, 0);
                cart.items[itemIndex] = product;
                yield cart.save();
                res.json({ success: true, message: "Item removed from Cart!", cart: cart });
            }
        }
        else {
            res.status(404);
            throw new Error("Item not found");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("something went wrong");
    }
});
exports.decreaseCartQty = decreaseCartQty;
