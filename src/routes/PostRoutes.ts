import { Request,Response,Router } from "express";

import Post from "../models/Post";

class PostRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    
    }

    public async createPost(req: Request, res:Response):Promise<void>{
        const {curso} = req.body;
        const {lugar} = req.body;
        const {sede} = req.body;

        const newPost = new Post({curso,lugar,sede});
        await newPost.save();
        res.json({status:res.status});
    }

    /* public async readPost(req: Request, res:Response):Promise<void>{
        const allPost = await Post.find();
        res.json({status: 200, misPost:allPost});
    } */
    public async readAllPosts(req: Request, res: Response): Promise<void> {
        const allPosts = await Post.find();
        res.json({ status: 200, posts: allPosts });
    }
    public async readPostId(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const allPosts = await Post.findById(id);
        res.json({ status: 200, posts: allPosts });
    }

    public async updatePost(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const post = await Post.findOneAndUpdate(id, req.body);
        res.json({ status: 200, misPost: post });
    }
    public async deletePost(req: Request, res: Response): Promise<void> {
        const postId = req.params.id; // Suponiendo que el id del post esté en la URL
        try {
            await Post.findByIdAndDelete(postId);
            res.json({ status: 200, message: "Post eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ status: 500, error: "Error al eliminar el post" });
        }
    }
    routes(){
        this.router.post("/",this.createPost);
        /* this.router.get("/",this.readPost); */
        this.router.get("/", this.readAllPosts);
        this.router.put("/:id", this.updatePost);
        this.router.delete("/:id", this.deletePost);
        this.router.get("/:id", this.readPostId);
    }
}

const postRoutes = new PostRouter()

export default postRoutes.router;