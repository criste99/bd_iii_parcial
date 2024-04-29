"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const fibonacciRoutes_1 = __importDefault(require("./routes/fibonacciRoutes"));
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 4040);
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, express_1.json)());
    }
    routes() {
        // POST route to handle mathematical operations
        this.app.get("/api/calculate", (req, res) => {
            const num1 = Number(req.query.n1);
            const num2 = Number(req.query.n2);
            if (typeof num1 !== "number" || typeof num2 !== "number") {
                return res.status(400).json({ error: "Both inputs must be numbers" });
            }
            const suma = num1 + num2;
            const resta = num1 - num2;
            const multiplicacion = num1 * num2;
            const division = num1 / num2;
            res.json({
                suma,
                resta,
                multiplicacion,
                division
            });
        });
        this.app.post("/api/calculate", (req, res) => {
            res.json({
                "suma": req.body.num1 + req.body.num2,
                "resta": req.body.num1 - req.body.num2,
                "multiplicacion": req.body.num1 * req.body.num2,
                "division": req.body.num1 / req.body.num2,
            });
        });
        this.app.use('/api', fibonacciRoutes_1.default);
        this.app.use('/api/post', PostRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("El servidor está escuchando en el puerto", this.app.get('port'));
        });
    }
}
exports.Server = Server;
