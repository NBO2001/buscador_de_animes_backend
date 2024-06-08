import configClient from "../elasticsearch/elasticsearch.services"
import { IAnimeSource } from "./anime.types";
import { estypes } from '@elastic/elasticsearch'

const search = async (query: string, max_result: number) => {
    const client = configClient();

    const { hits }: estypes.SearchResponse = await client.search<IAnimeSource>({
        "index": "anime",
        "query": {
            "multi_match": {
              "query": query,
              "fields": ["title^2", "synopsis^1"]
            }
        },
        "size": max_result
    });

    const animes: IAnimeSource[] = hits.hits.map( (anime: any) => anime._source)

    return animes;
}

export default { search }