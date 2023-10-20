import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NextEpisode from './nextEpisode';
import { getSeriesDetails } from './SeriesPoster';
import { SeriesPoster } from './SeriesPoster';
import DetailSeasons from './DetailSeasons';
import {useFirebaseAuth} from "./FirebaseAuthProvider";




export default function DetailSerie() {

    const { serie_id } = useParams();
    const [serie_data, setSerieData] = useState<any>(null);
    const [isFollowed, setisFollowed] = useState<boolean>(false);
    const userContext = useFirebaseAuth();
    useEffect(() => {
        if (userContext.userDoc) {
            const userDocData = userContext.userDoc?.data();
            // @ts-ignore
            setisFollowed(userDocData?.followedSeries?.includes(parseInt(serie_id)) ?? false);
        }
    }, [userContext.userDoc]);
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
                <div className='flex flex-col gap-6 px-6 bg-stone-700 pb-10'>
                    <SeriesPoster series={serie_data} genres={serie_data?.genres} />
                    {
                        isFollowed &&
                    <NextEpisode serie_data={serie_data} />
                    }
                    <DetailSeasons serie_data={serie_data} />
                </div>
            ): null}
        </div>
    );
}