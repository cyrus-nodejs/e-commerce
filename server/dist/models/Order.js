"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const OrderSchema = new Schema({
    owner: {
        type: String,
        required: true,
        ref: 'User'
    },
    items: [{
            itemId: {
                type: String,
            },
            title: String,
            image: {
                type: String,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity can not be less then 1.']
            },
            price: Number
        }],
    giftwrapper: {
        type: Number,
        default: 0,
    },
    deliveryfee: {
        type: Number,
        default: 0,
    },
    bill: {
        type: Number,
        required: true
    },
    paymentid: {
        type: String,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    delivered: {
        type: Boolean,
        default: false,
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});
exports.Order = mongoose_1.default.model("Order", OrderSchema);
