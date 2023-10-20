import React, {MouseEvent, RefObject, useEffect} from 'react';
import SeriesCard from "./components/SeriesCard";
import {SeriesPoster} from "./components/SeriesPoster";
import {useSearchParams} from "react-router-dom";
import {PaginationButton} from "./components/PaginationButton";

import {Pill} from "./components/Pill";

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


const getSeries = async (location: URLSearchParams, genreId: number = 0) : Promise<Series[]> => {
    return await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${location.get("page")}${genreId > 0 ? `&with_genres=${genreId}` : ""}`, options)
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


export const onClickGenre = (e: MouseEvent<HTMLElement>, categoriesRef: RefObject<HTMLDivElement> | null = null, genreId: number, location: URLSearchParams, setLocation: (location: URLSearchParams) => void) => {
    e.preventDefault();
    e.stopPropagation();
    location.set("genre", genreId.toString());
    location.set("page", "1");
    setLocation(location);
    if (categoriesRef && categoriesRef.current) categoriesRef.current.scrollIntoView({behavior: "smooth"})
}

export default function App() {
    const [location, setLocation] = useSearchParams()
    const [allSeries, setAllSeries] = React.useState<Series[]>([])
    const [allGenres, setAllGenres] = React.useState<Genre[]>([])
    const [trendingSeries, setTrendingSeries] = React.useState<Series>()
    const categoriesRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!location.has("page")) {
            location.set("page", "1");
        }

        if (location.has("genre") && Number(location.get("genre")) === 0) {
            location.delete("genre");
            setLocation(location);
        }
        getGenres().then(genres => setAllGenres(genres))
        if (location.has("genre")) {
            getSeries(location, Number(location.get("genre"))).then(series => setAllSeries(series))
        } else {
            getSeries(location).then(series => setAllSeries(series))
        }
        getTrendingSeries(location).then(series => setTrendingSeries(series[(Number(location.get("page")) - 1)%20]))
    }, [location, setLocation])
    return (
        <div className="flex flex-col p-5">
            {
                trendingSeries && (
                    <SeriesPoster series={trendingSeries} genres={allGenres} />
                )
            }
            <div className="flex w-full gap-5 whitespace-nowrap flex-wrap py-10" id="genres" ref={categoriesRef}>
                <Pill text="All" className={!location.has("genre") ? "!bg-amber-200" : ""} onClick={(e) => onClickGenre(e, categoriesRef, 0, location, setLocation)} />
                {
                    allGenres.map((genre) => (
                        <Pill key={`App-genres-${genre.id}`} text={genre.name} className={genre.id === Number(location.get("genre")) ? "!bg-amber-200" : ""} onClick={(e) => onClickGenre(e, categoriesRef,genre.id, location, setLocation)} />
                    ))
                }
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5  gap-8 justify-center">
                {allSeries.map((series) => (
                    <SeriesCard categoriesRef={categoriesRef} series={series} genres={allGenres} key={`SeriesCard-${series.id}`} />
                ))}
            </div>
            <div className="flex justify-center w-full gap-5 py-10">
                {Number(location.get("page")) > 1 &&
                    <PaginationButton categoriesRef={categoriesRef} text="< previous page" page={-1} />
                }
                <PaginationButton categoriesRef={categoriesRef} text="next page >" page={1} />
            </div>
        </div>
    )
}