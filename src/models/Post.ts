import { create } from "domain";
import { Schema, model } from "mongoose";
import { title } from "process";

const PostSchema = new Schema({
    curso: {type: String, required:true},
    lugar:{type: String, required:true},
    sede:{type: String, required:true},

    createAt:{type: Date, default: Date.now}
});

export default model("Post",PostSchema);