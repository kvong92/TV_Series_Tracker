import { Series, options } from '../App'
import { useEffect } from 'react'

export default function() {

    function followedSeriesList() {
        return[
            268,
            2661,
            125249,
            1160196,
            414906,
        ]
    }

    function singleSerie() {
        return [414906]
    }

    const getFollowedSeries = async () => {
        return await fetch(`https://api.themoviedb.org/3/search/tv?include_adult=true&language=en-US&&query=${singleSerie}`)
            .then(response => response.json())
            .then(data => data.results)
            .catch(error => console.log(error))
    }
    return (
        <div>
            <h1>Followed Series</h1>
            <ul>
                <li>
                    {getFollowedSeries()}
                </li>
            </ul>
        </div>
    )
}