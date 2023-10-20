import React, { useState, useEffect } from "react";
import { getSeriesDetails, SeriesDetails, getSeriesEpisodes } from "./SeriesPoster";
import { Pill } from "./Pill";

export default function Calendrier() {
    const [list_episodes, setListEpisodes] = useState<any[]>([]);

    const array_id_series = [
        84958, // Loki
        81329, // Chronicles of the sun
        205715, // Gen V
        226773,
        206559,
    ];

    useEffect(() => {
        const fetchData = async () => {
            const episodesData: any[] = [];

            for (let i = 0; i < array_id_series.length; i++) {
                const serieId = array_id_series[i];
                const serie = await getSeriesDetails(serieId);

                // Récupérer les épisodes de la saison en cours
                const episodes: any = await getSeriesEpisodes(serieId, serie.next_episode_to_air.season_number);

                episodes.episodes.forEach((episode: any) => {
                    const episodeDate = new Date(episode.air_date);
                    const today = new Date();
                    const dayOfWeek = today.getDay();
                    
                    // Trouver le dernier lundi et le prochain dimanche
                    const lastMonday = new Date(today);
                    lastMonday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Si aujourd'hui est un dimanche, on prend le lundi précédent.
                    
                    const nextSunday = new Date(today);
                    nextSunday.setDate(today.getDate() + 7 - dayOfWeek);
                
                    if (episodeDate >= lastMonday && episodeDate <= nextSunday) {
                        episodesData.push({
                            serie: serie,
                            episode: episode,
                        });
                    }
                });
                
            }

            setListEpisodes(episodesData);
        };

        fetchData();
    }, []);

    // Regrouper les séries par jour de la semaine
    const groupedEpisodes: { [key: string]: any[] } = {
        "lundi": [],
        "mardi": [],
        "mercredi": [],
        "jeudi": [],
        "vendredi": [],
        "samedi": [],
        "dimanche": [],
    };

    list_episodes.forEach((episode) => {
        const nextEpisodeDate = new Date(episode.episode.air_date);
        const nextEpisodeDay = nextEpisodeDate.toLocaleString('fr-FR', { weekday: 'long' });
        groupedEpisodes[nextEpisodeDay].push(episode);
    });

    return (
        <div className="bg-stone-700 flex flex-col gap-4 p-4">
            <h1 className="text-white text-xl font-semibold">Calendrier</h1>
            {Object.entries(groupedEpisodes).map(([day, episodes]) => (
                <div key={day} className="flex flex-col gap-3">
                    <h1 className="text-white font-semibold">{day}</h1>
                    <div className="flex flex-row w-full overflow-x-scroll h-auto">
                        {episodes.map((item, index) => (
                            <div className="flex flex-row basis-1/4 max-w-md flex-shrink-0" key={index}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${item.serie.poster_path}`}
                                    alt=""
                                    className="rounded-xl w-16 h-24"
                                />
                                <div className="flex flex-col p-3 justify-between">
                                    <p className="text-white font-semibold px-2">
                                        {item.serie.name}
                                    </p>
                                    <Pill text={`S${item.episode.season_number.toString().padStart(2, '0')} | EP${item.episode.episode_number.toString().padStart(2, '0')}`} className="inline-block"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
