import configClient from "../elasticsearch/elasticsearch.services"
import { IAnimeSource, TAnimeSimplified } from "./anime.types";
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

const simplifiedVersion = (animes: IAnimeSource[]) => {

    const animesSimplified: TAnimeSimplified[] = animes.map((
        {
            anime_id,
            anime_url,
            title,
            synopsis,
            main_pic,
            type,
            source_type,
            num_episodes,
            status,
            start_date,
            end_date,
            season,
            studios,
            genres,
            score,
            pics,
        }: IAnimeSource) => ({
            anime_id,
            anime_url,
            title,
            synopsis,
            main_pic,
            type,
            source_type,
            num_episodes,
            status,
            start_date,
            end_date,
            season,
            studios,
            genres,
            score,
            pics,
        }));
    return animesSimplified
}

export default { search, simplifiedVersion }