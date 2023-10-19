import React from 'react';

interface PillProps {
    text?: string;
    url?: string;
}

export function Pill({text = "", url = ""} : PillProps) {
    if ( url ) return (
        <a href={url} className="rounded-xl bg-gray-100 py-1 px-3 text-black">{text}</a>
    );

    return (
        <span className="rounded-xl bg-gray-100 py-1 px-3 text-black">{text}</span>
    );
}


