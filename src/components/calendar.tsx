import React, { useState, useEffect } from "react";

export default function Calendrier() {

    const [favSeries, setFavSeries] = useState<any[]>([]);

    useEffect(() => {
        
    }, []);


    return (
        <div className="flex flex-col items-start gap-6 self-stretch">
            <h1>Calendrier</h1>
        </div>
    );
}