import express from "express";
import { createServer } from "node:http";

import { connectToSocket } from "./controllers/socketManager.js";

import mongoose from "mongoose";


import cors from "cors";
import userRoutes from "./routes/userRoutes.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000));


app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));
app.use("/api/v1/users", userRoutes);

const MONGO_URI = "mongodb+srv://mdaman01245:NvELlLkSpZEdMcoh@zoomclonecluster.qnvn6tb.mongodb.net/zoom?retryWrites=true&w=majority&appName=ZoomCloneCluster"


const start = async () => {
    const connectionDb = await mongoose.connect(MONGO_URI);

    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);


    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8000");
    });
}

start();