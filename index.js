import express from "express";
import { config } from "dotenv";
import orderRouter from "./routes/order.js";
import productRouter from './routes/product.js'
import userRouter from "./routes/user.js";
import { connectToDB } from "./config/dbConfig.js";
import cors from "cors"
import { erroHandling } from "./middlewares/erroHandling.js";

config()

connectToDB();


const app = express();
app.use(express.json())

app.use(cors());
app.use(express.static('images'))
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order",orderRouter);
app.use(express.static('images'))
app.use(erroHandling)

let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
