import React, { useState, useEffect } from "react";
import { getSeriesEpisodes } from "./SeriesPoster";
import { formatDate } from "./nextEpisode";
import { Pill } from "./Pill";

async function getSeasons(serie_data: any) {
  let seasons = [];
  for (let i = 1; i <= serie_data.number_of_seasons; i++) {
    const data: any = await getSeriesEpisodes(serie_data.id, i);
    const array = {
      season: i,
      episodes: data.episodes,
    };
    seasons.push(array);
  }
  return seasons
}

export default function DetailSeasons({ serie_data }: any) {
  const [seasons, setSeasons] = useState<any>(null);
    useEffect(() => {
        getSeasons(serie_data).then((data) => { setSeasons(data) });
    } , []);

  const now = new Date();

  return (
    <div className="my-container">
      {seasons ? (
        <div>
          {seasons.map((season: any) => (
            // Vérifiez si la saison a des épisodes
            season.episodes && season.episodes.length > 0 && (
              <div key={season.season} className="flex flex-col gap-4">
                <h1 className="text-white text-xl font-semibold">{`Saison ${season.season}`}</h1>
                <div className="flex flex-row w-full overflow-x-scroll h-auto gap-5">
                  {season.episodes
                    .filter((episode: any) => new Date(episode.air_date) <= now)
                    .map((episode: any) => (
                      <div key={episode.id} className="flex flex-col basis-1/3 gap-5 max-w-md flex-shrink-0">
                        <div className="relative">
                          <img
                            src={
                              episode.still_path
                                ? `https://image.tmdb.org/t/p/w500/${episode.still_path}`
                                : `https://image.tmdb.org/t/p/original/${serie_data["backdrop_path"]}`
                            }
                            alt=""
                            className="rounded-md"
                          />
                          <div className="absolute bottom-2 left-2">
                            <Pill text={`S${season.season.toString().padStart(2, '0')} | EP${episode.episode_number.toString().padStart(2, '0')}`} />
                          </div>
                        </div>

                        <div className="flex flex-col px-5 gap-4 pb-5">
                          <p className="text-white font-bold">{episode.name}</p>
                          <p className="text-white">{episode.overview}</p>
                          <p className="text-white">{formatDate(new Date(episode.air_date))}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )
          ))}
        </div>
      ) : null}
    </div>
  );
}
