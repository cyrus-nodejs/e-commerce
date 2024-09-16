"use strict";
//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
const passport_1 = __importDefault(require("passport"));
passport_1.default.serializeUser(User_1.User.serializeUser());
passport_1.default.deserializeUser(User_1.User.deserializeUser());
passport_1.default.use(User_1.User.createStrategy());
// use static serialize and deserialize of model for passport session support
exports.default = passport_1.default;
