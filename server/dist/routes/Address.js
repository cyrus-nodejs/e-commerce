"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addressControllers_1 = require("../controllers/addressControllers");
const router = express_1.default.Router();
router.get("/getaddress", addressControllers_1.getAddress);
router.post("/createaddress", addressControllers_1.createAddress);
router.post("/updateaddress", addressControllers_1.updateAddress);
exports.default = router;
