import express from "express";
import dotenv from "dotenv";
import router from "./router";
import validateEnv from "./utils/validateEnv";


dotenv.config();

validateEnv();

const app = express();
const PORT = process.env.PORT ?? 4444;

app.use(express.json());


app.use("/api",router);

app.listen(PORT, () => {
    console.log(`Runner in port: ${PORT}`)
})