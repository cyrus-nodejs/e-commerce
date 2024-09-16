"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AddressSchema = new Schema({
    owner: {
        type: String,
        required: true,
        ref: 'User'
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    mobile2: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    nation: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    postalcode: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    ordernote: {
        type: String,
        required: true,
    },
});
exports.Address = mongoose_1.default.model("Address", AddressSchema);
