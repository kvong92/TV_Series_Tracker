import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NextEpisode from './nextEpisode';


export default function DetailSerie() {

    const api_key : string = "a308ab803acecd79c72758caa878739c";
    const api_base_url : string = "https://api.themoviedb.org/3/";

    //const { id_serie } = useParams();
    const id_serie  = 84958;
    const [serie_data, setSerieData] = useState<any>(null);

    useEffect(() => {
        const getDetailSerie = async () => {
            const response = await fetch(`${api_base_url}tv/${id_serie}?api_key=${api_key}&language=en-US`);
            const data = await response.json();
            setSerieData(data);
        }
        getDetailSerie();
    }, []);

    
    
    return (
        <div className='bg-stone-700 w-screen flex flex-col px-6 gap-6 items-center'>
            {serie_data ? (
                <NextEpisode serie_data={serie_data} />
            ) : (
                <p>Loading... Please wait</p>
            )}
        </div>
    );
}