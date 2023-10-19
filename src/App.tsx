import React, {useEffect} from 'react';
import './App.css';
import SeriesCard from "./components/SeriesCard";
import {SeriesPoster} from "./components/SeriesPoster";
import {useSearchParams} from "react-router-dom";
import {PaginationButton} from "./components/PaginationButton";


export interface Series {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    last_air_date: string | null;
    genre_ids: number[];
    original_language: string;
    popularity: number;
    origin_country: string[];
    original_name: string;
}

export type Genre = {
    id: number;
    name: string;
}
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER}`,
    }
};

const getSeries = async (location: URLSearchParams) : Promise<Series[]> => {
    return await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${location.get("page")}`, options)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => console.log(error))
}

const getGenres = async () : Promise<Genre[]> => {
    return await fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options)
        .then(response => response.json())
        .then(data => data.genres)
        .catch(error => console.log(error))
}

const getTrendingSeries = async (location: URLSearchParams) : Promise<Series[]> => {
    return await fetch(`https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=${Number(location.get("page")) <= 20 ? 1 : Math.floor(Number(location.get("page"))/20) + 1}`, options)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => console.log(error))
}



export default function App() {
    const [location,] = useSearchParams()
    const [allSeries, setAllSeries] = React.useState<Series[]>([])
    const [allGenres, setAllGenres] = React.useState<Genre[]>([])
    const [trendingSeries, setTrendingSeries] = React.useState<Series>()
    useEffect(() => {
        if (!location.has("page")) {
            location.set("page", "1");
        }
        getGenres().then(genres => setAllGenres(genres))
        getSeries(location).then(series => setAllSeries(series))
        getTrendingSeries(location).then(series => setTrendingSeries(series[(Number(location.get("page")) - 1)%20]))
    }, [location])
    return (
        <div className="flex flex-col gap-10 p-5">
            {
                trendingSeries && (
                    <SeriesPoster series={trendingSeries} genres={allGenres} />
                )
            }
            <div className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5  gap-8 justify-center">
                {allSeries.map((series) => (
                    <SeriesCard series={series} genres={allGenres} key={`SeriesCard-${series.id}`} />
                ))}
            </div>
            <div className="flex justify-center w-full gap-5">
                {Number(location.get("page")) > 1 &&
                    <PaginationButton text="< previous page" page={-1} />
                }
                <PaginationButton text="next page >" page={1} />
            </div>
        </div>
    )
}