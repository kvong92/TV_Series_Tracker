import React from "react";
import FollowButton from "./FollowButton";
import {Genre, onClickGenre, Series} from "../App";
import {Pill} from "./Pill";
import {useSearchParams} from "react-router-dom";

interface SeriesCardProps {
    categoriesRef: React.RefObject<HTMLDivElement>,
    series: Series,
    genres: Genre[]
}

export default function SeriesCard({ categoriesRef, series, genres }: SeriesCardProps) {
    const [location, setLocation] = useSearchParams();
    return (
        <a className="flex flex-col hover:scale-105 transition cursor-default" href={`/series/${series.id}`}>
            <div className="relative">
                <img className="rounded-md w-full" src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} />
                <FollowButton />
                {series.vote_average &&
                    <Pill text={series.vote_average.toFixed(1).toString()} className="absolute top-2 left-2" />
                }
            </div>
            <span className="text-xl font-bold py-2">{series.name}</span>
            <div className="flex gap-2 flex-wrap">
                {series.genre_ids.map((genreId) => {
                    const genre = genres.find((genre) => genre.id === genreId);
                    if (genre)
                    return <Pill text={genre.name} onClick={(e) => onClickGenre(e, categoriesRef, genre.id, location, setLocation)} />
                } )}
            </div>
        </a>
    );
}