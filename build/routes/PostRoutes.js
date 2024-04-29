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
const express_1 = require("express");
const Post_1 = __importDefault(require("../models/Post"));
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curso } = req.body;
            const { lugar } = req.body;
            const { sede } = req.body;
            const newPost = new Post_1.default({ curso, lugar, sede });
            yield newPost.save();
            res.json({ status: res.status });
        });
    }
    /* public async readPost(req: Request, res:Response):Promise<void>{
        const allPost = await Post.find();
        res.json({status: 200, misPost:allPost});
    } */
    readAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield Post_1.default.find();
            res.json({ status: 200, posts: allPosts });
        });
    }
    readPostId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const allPosts = yield Post_1.default.findById(id);
            res.json({ status: 200, posts: allPosts });
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield Post_1.default.findOneAndUpdate(id, req.body);
            res.json({ status: 200, misPost: post });
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.id; // Suponiendo que el id del post esté en la URL
            try {
                yield Post_1.default.findByIdAndDelete(postId);
                res.json({ status: 200, message: "Post eliminado exitosamente" });
            }
            catch (error) {
                res.status(500).json({ status: 500, error: "Error al eliminar el post" });
            }
        });
    }
    routes() {
        this.router.post("/", this.createPost);
        /* this.router.get("/",this.readPost); */
        this.router.get("/", this.readAllPosts);
        this.router.put("/:id", this.updatePost);
        this.router.delete("/:id", this.deletePost);
        this.router.get("/:id", this.readPostId);
    }
}
const postRoutes = new PostRouter();
exports.default = postRoutes.router;
