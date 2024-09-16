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
exports.getViewedItems = exports.addViewedItem = exports.relatedItem = exports.topDeals = exports.clearance = exports.flashDeals = exports.topFeaturedGallery = exports.topFeaturedSlide = exports.recommended = exports.trending = exports.getItemDetails = exports.getCategory = exports.typeCategory = exports.searchItem = exports.deleteItem = exports.updateItem = exports.postItem = exports.getItem = void 0;
const Item_1 = require("../models/Item");
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Item.find().sort({ date: -1 }).then(items => res.json(items)).catch(err => res.json("Error : " + err));
});
exports.getItem = getItem;
const postItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const { title, description, category, price, discount, status, trending, quantity, recommended, topfeatured, topdeals } = req.body;
    const image = req.file.filename;
    console.log(req.body);
    const discountAmount = discount * 0.01 * price;
    const newprice = Math.round(price - discountAmount);
    const newItemData = {
        title,
        description,
        image,
        trending,
        category,
        recommended,
        topfeatured,
        topdeals,
        newprice,
        price,
        quantity,
        discount,
        status,
    };
    const newItem = new Item_1.Item(newItemData);
    const filter = { category: category };
    const update = { $addToSet: { item: newItem } };
    const doc = yield Item_1.Category.findOneAndUpdate(filter, update, { new: true, upsert: true, includeResultMetadata: true });
    doc.save;
    newItem.save()
        .then(() => res.json(newItem), res.status(200).json)
        .catch((err) => res.json(err));
});
exports.postItem = postItem;
const updateItem = (req, res) => {
    Item_1.Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (item) {
        Item_1.Item.findOne({ _id: req.params.id }).then(function (item) {
            res.json(item);
        });
    });
};
exports.updateItem = updateItem;
const deleteItem = (req, res) => {
    Item_1.Item.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
        res.json({ sucess: true });
    });
};
exports.deleteItem = deleteItem;
const searchItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchitem = req.query;
    yield Item_1.Item.find({ title: { $regex: `${searchitem}`, $options: "i" } }).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err));
});
exports.searchItem = searchItem;
const typeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Category.find().sort({ date: -1 }).then(items => res.json(items)).catch(err => res.json("Error : " + err));
});
exports.typeCategory = typeCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield Item_1.Item.find({ category: req.params.id });
        console.log(item);
        if (item) {
            console.log(item);
            res.json({ success: true, message: "categories sorted!", item: item });
        }
    }
    catch (err) {
        res.json({ success: false, message: "No categories!" });
    }
});
exports.getCategory = getCategory;
const getItemDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Item.find({ title: req.params.id }).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err));
});
exports.getItemDetails = getItemDetails;
const trending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Item.find({ trending: "true" }).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err));
});
exports.trending = trending;
const recommended = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Item.find({ recommended: "true" }).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err));
});
exports.recommended = recommended;
const topFeaturedSlide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Item.find({ topfeatured: "true", status: "New" }).sort({ _id: -1 }).limit(4).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err));
});
exports.topFeaturedSlide = topFeaturedSlide;
const topFeaturedGallery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Item.find({ topfeatured: "true" }).limit(6).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err));
});
exports.topFeaturedGallery = topFeaturedGallery;
const flashDeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Item.find({ status: "New", }).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err));
});
exports.flashDeals = flashDeals;
const clearance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Item.find({ discount: { $gt: 1, $lt: 20 } }).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err));
});
exports.clearance = clearance;
const topDeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item_1.Item.find({ topdeals: "true", }).then(items => res.json(items)).catch(err => res.status(400).json("Error : " + err));
});
exports.topDeals = topDeals;
const relatedItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, itemId } = req.body;
    console.log(category, itemId);
    try {
        const item = yield Item_1.Item.find({ _id: { $ne: itemId }, category: category });
        if (item) {
            console.log(item);
            res.json({ success: true, message: "view related items!", item: item });
        }
        else {
            res.json({ success: false, message: "No related items!" });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.relatedItem = relatedItem;
const addViewedItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId, price, discount, image, title } = req.body;
    const owner = req.user._id;
    console.log(`my ${owner}, ${itemId}, ${price}, ${discount}, ${image}, ${title} `);
    try {
        const viewed = yield Item_1.View.findOne({ owner: owner });
        console.log(viewed);
        if (viewed) {
            //  viewed.vieweditems.push({title, price, image, discount})
            //  await  viewed.save()
            const newitem = { itemId, title, price, image, discount };
            const filter = { owner: owner };
            const update = { $addToSet: { items: newitem } };
            const doc = yield Item_1.View.findOneAndUpdate(filter, update, { new: true, upsert: true, includeResultMetadata: true });
            doc.save;
            res.json({ success: true, message: "Item added to View List!" });
        }
        else {
            yield Item_1.View.create({
                owner,
                items: [{ itemId, title, image, price, discount }],
            });
            res.json({ success: true, message: "viewed List created!" });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.addViewedItem = addViewedItem;
const getViewedItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.user._id;
    try {
        console.log(owner);
        const view = yield Item_1.View.findOne({ owner: owner });
        if (view) {
            console.log(`soc ${view}`);
            res.json({ success: true, message: "Recently viewed!", view: view });
        }
        else {
            res.json({ success: false, message: "No recentely viewed!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
exports.getViewedItems = getViewedItems;
