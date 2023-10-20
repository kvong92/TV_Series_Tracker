import React, {useEffect, useState} from "react";
import {Genre, options, Series} from "../App";
import FollowButton from "./FollowButton";
import {Pill} from "./Pill";

interface SeriesPosterProps {
    series: Series,
    genres: Genre[]
}

export interface SeriesDetails extends Series {
    created_by: {
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string;
    }[],
    next_episode_to_air: {
        air_date: string;
        episode_number: number;
        episode_type: string;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        show_id: number;
        still_path: string;
        vote_average: number;
        vote_count: number;
    },
    last_episode_to_air: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        show_id: number;
        still_path: string;
        vote_average: number;
        vote_count: number;
    },
    episode_run_time: number[],
    homepage: string,
    networks: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[],
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
        vote_average: number;
    }[],
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[],
    languages: string[],
    status: string;
    tagline: string;
    type: string;
    genres: Genre[]
    number_of_episodes: number;
    number_of_seasons: number;

}

export const getSeriesDetails= async (seriesId: number): Promise<SeriesDetails> => {
    return await fetch(`https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`, options)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const getSeriesEpisodes= async (seriesId: number, seasonNumber: number): Promise<SeriesDetails> => {
    return await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?language=en-US`, options)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const getSeriesDetailEpisodes= async (seriesId: number, seasonNumber: number, episodeNumber:number): Promise<SeriesDetails> => {
    return await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`, options)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export function SeriesPoster ({ series }: SeriesPosterProps) {
    const [seriesDetails, setSeriesDetails] = useState<SeriesDetails>()
    useEffect(() => {
        getSeriesDetails(series.id).then((series) => setSeriesDetails(series))

    } , [series])
    return (
            <a className="relative w-full cursor-default" href={`/series/${series.id}`}>
                <img className="rounded-md w-full" src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`} alt={series.name} />
                <FollowButton seriesId={series.id} />
                {series.vote_average &&
                    <Pill text={series.vote_average.toFixed(1).toString()} className="absolute top-2 left-2" />
                }
                <div className="absolute flex flex-col bottom-1 left-1  md:bottom-10 md:left-10 p-2 text-white w-5/6 sm:w-2/3 md:w-1/2  xl:w-1/3 max-h-full">
                    <span className="sm:text-xl md:text-2xl lg:text-4xl font-bold pb-4">{series.name}</span>
                    <p className="text-sm md:text-lg lg:text-xl hyphens-auto line-clamp-4" lang="en">
                        {series.overview}
                    </p>
                    {seriesDetails &&
                        <div className="flex gap-2 flex-wrap mt-4 text-xs md:text-sm">
                            <Pill text={`${seriesDetails.number_of_seasons} season${seriesDetails.number_of_seasons > 1 ? 's': ''}`} />
                            <Pill text={`${seriesDetails.number_of_episodes} episode${seriesDetails.number_of_episodes > 1 ? 's': ''}`} />
                            {seriesDetails.genres.map((genre) =>
                                <Pill text={genre.name} url={`/?genre=${genre.id}#genres`} key={`SeriesPoster-${genre.id}`} />
                            )}
                            <Pill text={seriesDetails.first_air_date.split('-')[0]} />
                        </div>
                    }
                </div>
            </a>
    );
}
