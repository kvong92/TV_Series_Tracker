import React from "react";
import FollowButton from "./FollowButton";
import {Genre, Series} from "../App";
import {Pill} from "./Pill";

interface SeriesCardProps {
    series: Series,
    genres: Genre[]
}

export default function SeriesCard({ series, genres }: SeriesCardProps) {
    return (
        <a className="flex flex-col" href={`/series/${series.id}`}>
            <div className="relative ">
                <img className="rounded-md w-full" src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} />
                <FollowButton />
            </div>
            <span className="text-xl font-bold py-2">{series.name}</span>
            <div className="flex gap-2 flex-wrap">
                {series.genre_ids.map((genreId) => {
                    const genre = genres.find((genre) => genre.id === genreId);
                    return <Pill text={genre?.name} url={`/genres/${genre?.id}`} />;
                } )}
            </div>
        </a>
    );
}