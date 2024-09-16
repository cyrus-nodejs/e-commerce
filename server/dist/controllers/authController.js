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
exports.Servicom = exports.Logout = exports.ResetPassword = exports.UpdatePassword = exports.ForgotPassword = exports.Login = exports.Register = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const index_1 = __importDefault(require("../middlewares/passport/index"));
const createSecretToken_1 = require("../middlewares/jwt/createSecretToken");
const nodemailer_1 = require("../utils/nodemailer");
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        User_1.User.register(new User_1.User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
            if (err) {
                res.json({ success: false, message: "Your account could not be saved. Error: " + err });
            }
            else {
                req.login(user, (err) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        console.log(req.user);
                        res.json({ success: true, message: "Your account has been saved" });
                        // res.json({ success: true, message: "Your account has been saved" }); 
                    }
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.username) {
            res.json({ success: false, message: "Username was not given" });
        }
        else {
            if (!req.body.password) {
                res.json({ success: false, message: "Password was not given" });
            }
            else {
                index_1.default.authenticate('local', function (err, user, info) {
                    if (err) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        if (!user) {
                            res.json({ success: false, message: 'username or password incorrect' });
                        }
                        else {
                            req.login(user, function (err) {
                                if (err) {
                                    res.json({ success: false, message: err });
                                }
                                else {
                                    console.log(req.user);
                                    const token = (0, createSecretToken_1.createSecretToken)(user._id);
                                    res.cookie("token", token, {
                                        withCredentials: true,
                                        httpOnly: false,
                                    });
                                    res.json({ success: true, message: "Authentication successful" });
                                }
                            });
                        }
                    }
                })(req, res);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.Login = Login;
const ForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield User_1.User.findOne({ email });
        if (!user || user.length === 0) {
            res.json({
                success: false,
                message: "You  are not registered!",
            });
        }
        else {
            const token = (0, createSecretToken_1.forgotPasswordToken)(user._id);
            yield nodemailer_1.contactEmail.sendMail({
                from: '"Shop-here 👻" adeyemiemma45@gmail.com>', // sender address
                to: `${email}`, // list of receivers
                subject: "Forgot Password Link", // Subject line
                text: "Hello world?", // plain text body
                html: `We have received a request to reset your password. Please reset your password using the link below.",
          ${process.env.FRONTEND_URL}/resetpassword/${token},
          Reset Password`, // html body
            });
            res.json({ success: true, message: "A password reset link has been sent to your email.", token: token });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.ForgotPassword = ForgotPassword;
const UpdatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, username } = req.body;
    try {
        User_1.User.findByUsername(username, (err, user) => {
            if (err) {
                res.send(err);
            }
            else {
                user.changePassword(oldPassword, req.body.newPassword, function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send('successfully change password');
                    }
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.UpdatePassword = UpdatePassword;
const ResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, username, password } = req.body;
    console.log(token);
    console.log(username, password);
    try {
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.FORGOT_PASSWORD, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return res.json({ success: false, message: `Incorrect token or expired!` });
                }
                User_1.User.findByUsername(username, (err, user) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        user.setPassword(password, function (err) {
                            if (err) {
                                res.json({ success: false, message: err });
                            }
                            else {
                                user.save();
                                res.json({ success: true, message: "Password reset successfull" });
                            }
                        });
                    }
                });
            }));
        }
        else {
            return res.json({ success: false, message: "Authentication Error" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.ResetPassword = ResetPassword;
const Logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        req.logout(function () {
            res.json({ success: true, message: 'logging out' });
        });
    }
    else {
        res.json({ success: false, message: 'no user to log out' });
    }
});
exports.Logout = Logout;
const Servicom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Welcom to Servicom");
});
exports.Servicom = Servicom;
