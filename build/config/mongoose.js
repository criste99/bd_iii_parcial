"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = "mongodb+srv://cristianespinel95:uudGzD5a4Yzj4FGY@cluster0.rpbwoxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.connect(MONGO_URL || process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
