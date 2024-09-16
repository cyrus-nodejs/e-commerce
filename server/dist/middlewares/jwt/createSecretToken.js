"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordToken = exports.createSecretToken = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createSecretToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
    });
};
exports.createSecretToken = createSecretToken;
const forgotPasswordToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.FORGOT_PASSWORD, {
        expiresIn: '15m',
    });
};
exports.forgotPasswordToken = forgotPasswordToken;
