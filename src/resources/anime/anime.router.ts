import { Router } from "express";
import animeController from "./anime.controller";



const animeRouter = Router();


animeRouter.get("/:query", animeController.read);

export default animeRouter;