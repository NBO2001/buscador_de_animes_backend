import { Router } from "express";
import animeController from "./anime.controller";



const animeRouter = Router();

animeRouter.post("/", animeController.read);

export default animeRouter;