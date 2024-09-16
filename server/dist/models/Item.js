"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = exports.Category = exports.Item = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ViewSchema = new Schema({
    expireAt: {
        type: Date,
        default: new Date(),
        expires: 86400,
    },
    owner: {
        type: String,
        required: true,
        ref: 'User'
    },
    items: [{
            itemId: {
                type: String,
                expires: 500
            },
            title: String,
            image: {
                type: String,
            },
            discount: {
                type: Number,
            },
            price: Number,
        }],
});
const CategorySchema = new Schema({
    category: {
        type: String,
    },
    avatar: {
        type: String,
    },
    item: [{
            type: Array,
            ref: 'Item'
        }],
});
const ItemSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    newprice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
    },
    review: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    unit: {
        type: Number,
        default: 1,
    },
    quantity: {
        type: Number,
        default: 1
    },
    image: {
        type: String,
        required: true,
        unique: true,
    },
    trending: {
        type: Boolean,
        required: true,
    },
    recommended: {
        type: Boolean,
        required: true,
    },
    topfeatured: {
        type: Boolean,
        required: true,
    },
    topdeals: {
        type: Boolean,
    },
    date_added: {
        type: Date,
        default: Date.now
    },
});
exports.Item = mongoose_1.default.model("Item", ItemSchema);
exports.Category = mongoose_1.default.model("Category", CategorySchema);
exports.View = mongoose_1.default.model("View", ViewSchema);
