import { Request, Response } from "express";
import configClient from "../elasticsearch/elasticsearch.services";

const read = async (req: Request, res: Response) => {
    const client = configClient()
    try{
        const {hits} = await client.search({
            "index": "anime",
            "query": {
                match: {
                    "title": "one punch man"
                }
            }
        })

        res.status(200).json(hits.hits);
    }
    catch (err){
        res.status(400).json(err);
    }

}


export default {read};