import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

import fibonacciRoutes from "./routes/fibonacciRoutes";
import postRoutes from "./routes/PostRoutes";

class Server {
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        this.app.set("port", process.env.PORT || 4040);
        this.app.use(morgan("dev"));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(express.json()); 
        this.app.use(json()); 
    }
    
    routes(){


        // POST route to handle mathematical operations
        this.app.get("/api/calculate", (req, res) => {
            const num1= Number(req.query.n1);
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
        
       this.app.use('/api', fibonacciRoutes);
       this.app.use('/api/post', postRoutes);
        
    }
    
    public start(){
        this.app.listen(this.app.get("port"), () => {
            console.log("El servidor está escuchando en el puerto", this.app.get('port'));
        });
    }
}

export { Server };