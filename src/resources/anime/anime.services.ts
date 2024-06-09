import configClient from "../elasticsearch/elasticsearch.services"
import { IAnimeSource, TAnimeSimplified } from "./anime.types";
import { estypes } from '@elastic/elasticsearch'

const search = async (query: string, max_result: number) => {
    const client = configClient();

    const { hits }: estypes.SearchResponse = await client.search<IAnimeSource>({
        "index": "anime",
        "query": {
          "bool": {
            "should": [
              {
                "match_phrase": {
                  "title": {
                    "query": query,
                    "boost": 5.1
                  }
                }
              },
              {
                "match": {
                  "title": {
                    "query": query,
                    "boost": 8,
                    "operator": "and"
                  }
                }
              },
              {
                "match": {
                  "title": {
                    "query": query,
                    "boost": 1.1
                  }
                }
              },
              {
                "match_phrase": {
                  "synopsis": query
                }
              },
              {
                "rank_feature": {
                  "field": "score",
                  "boost": 3.0
                }
              },
              {
                "rank_feature": {
                  "field": "dropped_count",
                  "boost": 1.2
                }
              },
              {
                "rank_feature": {
                  "field": "score_count",
                  "boost": 3.5
                }
              },
              {
                "rank_feature": {
                  "field": "completed_count",
                  "boost": 2.5
                }
              },
              {
                "rank_feature": {
                  "field": "num_episodes",
                  "boost": 1.9
                }
              }
            ]
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