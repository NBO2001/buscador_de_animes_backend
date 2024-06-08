import { Router } from "express";
import animeRouter from "../resources/anime/anime.router";


const v1 = Router();

v1.use("/anime", animeRouter);

export default v1;