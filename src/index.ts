import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router";
import validateEnv from "./utils/validateEnv";

dotenv.config();

validateEnv();

const app = express();
const PORT = process.env.PORT ?? 4444;

app.use(cors());

app.use(express.json());

// Use the router for API routes
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
