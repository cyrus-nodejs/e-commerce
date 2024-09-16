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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddress = exports.createAddress = exports.getAddress = void 0;
const Address_1 = require("../models/Address");
const getAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    try {
        let address = yield Address_1.Address.findOne({ owner: owner });
        console.log(`This is ${address}`);
        if (address) {
            res.json({ success: true, message: "View address!", address: address });
        }
        else {
            res.json({ success: false, message: "No adress yet!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
exports.getAddress = getAddress;
const createAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user.id;
    const { firstname, lastname, mobile, mobile2, address, nation, region, postalcode, province, ordernote } = req.body;
    console.log(req.body.firstname);
    console.log(req.body);
    try {
        const location = yield Address_1.Address.create({ owner, firstname, lastname, mobile, mobile2, address, nation,
            region, postalcode, province, ordernote,
        });
        console.log(location);
        res.json({ success: true, message: "Default address saved!" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
exports.createAddress = createAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.id;
    const { firstname, lastname, mobile, mobile2, address, nation, region, postalcode, province, ordernote } = req.body;
    console.log(req.body.firstname);
    console.log(req.body);
    try {
        const filter = { owner: user };
        const update = { firstname: firstname, lastname: lastname, mobile: mobile, mobile2: mobile2,
            address: address, nation: nation, region: region, postalcode: postalcode, province: province, ordernote: ordernote
        };
        const doc = yield Address_1.Address.findOneAndUpdate(filter, update, { new: true, upsert: true, includeResultMetadata: true });
        doc.save;
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
exports.updateAddress = updateAddress;
