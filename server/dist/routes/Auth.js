"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
const verifyToken_1 = require("../middlewares/jwt/verifyToken");
router.get("/", authController_1.Servicom);
router.post("/register", authController_1.Register);
router.post("/login", authController_1.Login);
router.post("/logout", authController_1.Logout);
router.post('/', verifyToken_1.userVerification);
router.post('/forgotpassword', authController_1.ForgotPassword);
router.post('/resetpassword', authController_1.ResetPassword);
router.post('/updatepassword', authController_1.UpdatePassword);
exports.default = router;
