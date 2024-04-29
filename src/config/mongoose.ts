import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://cristianespinel95:uudGzD5a4Yzj4FGY@cluster0.rpbwoxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("useFindAndModify",false);
mongoose.connect(MONGO_URL || process.env.MONGO_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
});
