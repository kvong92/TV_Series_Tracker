import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NextEpisode from './nextEpisode';
import { getSeriesDetails } from './SeriesPoster';
import { SeriesPoster } from './SeriesPoster';
import DetailSeasons from './DetailSeasons';




export default function DetailSerie() {

    const { serie_id } = useParams();
    const [serie_data, setSerieData] = useState<any>(null);
    const [next_episode, setNextEpisode] = useState<any>(null);

    useEffect(() => {
        const getDetailSerie = async () => {
            if (serie_id) {
                const data = await getSeriesDetails(parseInt(serie_id));
                setSerieData(data);
            }
        }
        if (serie_id) {
            getDetailSerie();
        }
    }, [serie_id]);

    return (
        <div>
            {serie_data ? (
                <div className='flex flex-col gap-6 px-6 bg-stone-700'>
                    <SeriesPoster series={serie_data} genres={serie_data?.genres} />
                    <NextEpisode serie_data={serie_data} />
                    <DetailSeasons serie_data={serie_data} />
                </div>
            ): null}
        </div>
    );
}