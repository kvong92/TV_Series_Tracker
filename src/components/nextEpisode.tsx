import React, { useState, useEffect } from "react";

interface NextEpisodeProps {
    serie_data: any;
}

export default function NextEpisode({ serie_data }: NextEpisodeProps) {
    console.log(serie_data);

    const airDate = new Date(serie_data["next_episode_to_air"]["air_date"]);

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        };
        return date.toLocaleDateString('fr-FR', options);
    };
    return (
        <div className="flex flex-col items-start gap-6 self-stretch">
            <p className="text-white text-xl font-semibold">Next Episode</p>
            <div className="flex flex-row">
                <img src={`https://image.tmdb.org/t/p/original/${serie_data["backdrop_path"]}`} alt="" className="w-2/6	rounded-xl"/>
                <div className="flex flex-col items-center gap-4 px-4">
                    <p className="overflow-hidden text-white text-ellipsis text-base font-semibold">{serie_data["next_episode_to_air"]["name"]}</p>
                    <p className="text-white text-ellipsis text-base font-normal">{serie_data["next_episode_to_air"]["overview"]}</p>
                    <p className="text-white text-xs font-normal">{formatDate(airDate)}</p>
                </div>
            </div>
        </div>
    );
}