"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// importing modules
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    resetlink: {
        type: String,
        unique: true,
    },
    register_date: {
        type: Date,
        default: Date.now
    },
});
UserSchema.plugin(passport_local_mongoose_1.default);
exports.User = mongoose_1.default.model("User", UserSchema);
