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
require("dotenv/config");
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const connectDb_1 = require("../models/connectDb");
const Auth_1 = __importDefault(require("../routes/Auth"));
const Items_1 = __importDefault(require("../routes/Items"));
const Cart_1 = __importDefault(require("../routes/Cart"));
const Order_1 = __importDefault(require("../routes/Order"));
const Address_1 = __importDefault(require("../routes/Address"));
const index_1 = __importDefault(require("../middlewares/passport/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.set('trust proxy', true);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('assets'));
app.use((0, compression_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("common"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ limit: "100mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "100mb", extended: true }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: [
        'http://localhost:5173',
        'https://e-commerce-omega-pearl.vercel.app'
    ],
}));
app.use((0, express_session_1.default)({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET, //pick a random string to make the hash that is generated secure
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false, //required
    resave: false, //required
}));
app.use(index_1.default.initialize());
app.use(index_1.default.session());
//  app.get('/items', express.static('assets'))
app.use('/items', express_1.default.static(path_1.default.join(__dirname, '../assets')));
app.use('/category', express_1.default.static(path_1.default.join(__dirname, '../assets')));
// app.use('/search', express.static(path.join(__dirname, 'assets')));
// app.use('/category/:id', express.static(path.join(__dirname, 'assets')));
app.use("/", Auth_1.default);
app.use("/", Items_1.default);
app.use("/", Cart_1.default);
app.use("/", Order_1.default);
app.use("/", Address_1.default);
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line no-undef
        yield (0, connectDb_1.connectDB)(process.env.MONGO_URL);
    }
    catch (err) {
        console.log(err);
    }
});
startServer();
