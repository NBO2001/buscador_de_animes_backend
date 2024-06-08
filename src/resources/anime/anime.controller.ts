import { Request, Response } from "express";
import animeServices from "./anime.services";
import { IQueryAnime } from "./anime.types";
import { sanitizeString } from "../../utils/sanitizeString";

const read = async (req: Request, res: Response) => {
    try{
        const { query } = req.body as IQueryAnime;
        const defaultMaxResults = 10;

        const cleadQuery = sanitizeString(query);

        const animes = await animeServices.search(cleadQuery, defaultMaxResults);

        res.status(200).json(animes);

    }
    catch (err){
        res.status(400).json(err);
    }

}


export default {read};