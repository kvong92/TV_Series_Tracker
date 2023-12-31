import React from "react";

interface NextEpisodeProps {
  serie_data: any;
}

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  return date.toLocaleDateString('fr-FR', options);
};

export default function NextEpisode({ serie_data }: NextEpisodeProps) {
  if (!serie_data["next_episode_to_air"]) {
    // Si next_episode_to_air est nul, ne rien rendre
    return null;
  }

  const airDate = new Date(serie_data["next_episode_to_air"]["air_date"]);

  return (
    <div className="flex flex-col items-start gap-6 self-stretch">
      <p className="text-white text-xl font-semibold">Next Episode</p>
      <div className="flex flex-row">
        <img
          src={
            serie_data["next_episode_to_air"]["still_path"]
              ? `https://image.tmdb.org/t/p/original/${serie_data["next_episode_to_air"]["still_path"]}`
              : `https://image.tmdb.org/t/p/original/${serie_data["backdrop_path"]}`
          }
          alt=""
          className="w-96 rounded-xl"
        />
        <div className="flex flex-col gap-3 p-3">
          <p className="text-white font-semibold">
            {serie_data["next_episode_to_air"]["name"]}
          </p>
          <p className="text-white">{serie_data["next_episode_to_air"]["overview"]}</p>
          <p className="text-white">{formatDate(airDate)}</p>
        </div>
      </div>
    </div>
  );
}
