import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {options} from "../App";

export default function FollowedSeries() {
    
    const [location, setLocation] = useSearchParams();
    const [series, setSeries] = useState([]);

    const getSeriesBySearch = async (location: URLSearchParams) => {
        return await fetch(`https://api.themoviedb.org/3/search/tv?include_adult=true&language=en-US&query=${location.get("search")}`, options)
            .then(response => response.json())
            .then(data => data.results)
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (location.has("search")) {
        getSeriesBySearch(location).then(series => setSeries(series))
        return
        }
        getSeriesBySearch(location).then(series => setSeries(series))
    }, [location]);

    return (
        <div>
            <h1>Followed Series</h1>
            <ul>
                <li>
                    {series}
                </li>
            </ul>
        </div>
    );
}