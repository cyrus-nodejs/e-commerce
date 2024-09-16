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
exports.forgotPasswordVerification = exports.userVerification = void 0;
//@ts-nocheck
// import {User} from "../../models/User"
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userVerification = (req, res, next) => {
    const token = req.cookies.token;
    //    console.log(`verifytoken => ${token}`)
    if (!token) {
        return res.json({ success: false, message: "Login required!" });
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.json({ success: false, message: `Authorization require` });
        }
        else {
            const user = req.user;
            console.log(`THIS ${user}`);
            if (user)
                return res.json({ success: true, message: `Hi ${user.username}`, user: user });
            else
                return res.json({ success: false, message: "No Loggedin!!" });
        }
    }));
    next();
};
exports.userVerification = userVerification;
const forgotPasswordVerification = (req, res, next) => {
    const token = req.cookies.token;
    //    console.log(`verifytoken => ${token}`)
    if (!token) {
        return res.json({ success: false, message: "Not Authorized! Token does not exist" });
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.json({ success: false, message: `Cannot verify token + ${err}` });
        }
        else {
            const user = req.user;
            if (user)
                return res.json({ success: true, message: `Welcome ${user.username}`, user: user.username });
            else
                return res.json({ success: false, message: "Not Authorized!" });
        }
    }));
    next();
};
exports.forgotPasswordVerification = forgotPasswordVerification;
