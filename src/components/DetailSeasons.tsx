import React, { useState, useEffect } from "react";
import { getSeriesEpisodes } from "./SeriesPoster";
import { formatDate } from "./nextEpisode";

export default function DetailSeasons({ serie_data }: any) {

    const [seasons, setSeasons] = useState<any>(null);

    async function getSeasons() {
        let seasons = [];
        for (let i = 1; i <= serie_data.number_of_seasons; i++) {
           const data:any = await getSeriesEpisodes(serie_data.id, i);
           const array = {
                season: i,
                episodes: data.episodes
           }
            seasons.push(array);
        }
        setSeasons(seasons);
    }

    useEffect(() => {
        getSeasons();
    }, []);

    console.log(seasons);

    const now = new Date();

    return (
        <div>
            {seasons ? (
                <div className="flex flex-col gap-4">
                    {seasons.map((season: any) => (
                        <div key={season.season} className="flex flex-col gap-4">
                            <h1 className="text-white text-xl font-semibold">{`Saison ${season.season}`}</h1>
                            <div className="flex flex-nowrap whitespace-nowrap overflow-x-scroll gap-4">
                            {season.episodes
                                .filter((episode: any) => new Date(episode.air_date) <= now)
                                .map((episode: any) => (
                                    <div key={episode.id} className="w-96">
                                        <img src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`} alt="" className="rounded-md" />
                                        <div className="flex flex-col gap-3 p-3">
                                            <p className="text-white font-semibold">{episode.name}</p>
                                            <p className="text-white">{episode.overview}</p>
                                            <p className="text-white">{formatDate(new Date(episode.air_date))}</p> {/* Utilisez formatDate pour formater la date */}
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
