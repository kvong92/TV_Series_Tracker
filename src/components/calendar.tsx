import React, { useState, useEffect } from "react";
import { getSeriesDetails } from "./SeriesPoster";

export default function Calendrier({ list_fav_series }:any) {

    const [list_series, setListSeries] = useState<any>([]);

    useEffect(() => {
        
    }, []); 

    return (
        <div className="flex flex-col items-start gap-6 self-stretch">
            <h1>Calendrier</h1>
        </div>
    );
}