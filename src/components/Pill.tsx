import React, {MouseEvent} from 'react';

interface PillProps {
    text?: string;
    url?: string;
    onClick?: ((e: MouseEvent<HTMLElement>) => void) | null;
    className?: string;
}

export function Pill({text = "", url = "", onClick = null, className=""} : PillProps) {
    if ( url ) return (
        <a href={url} className={`rounded-xl bg-gray-100 py-1 px-3 text-black ${className}`} onClick={onClick != null ? onClick : undefined}>{text}</a>
    );

    return (
        <span className={`rounded-xl bg-gray-100 py-1 px-3 text-black ${className} ${onClick != null ? "cursor-pointer" : ""}`} onClick={onClick != null ? onClick : undefined}>{text}</span>
    );
}


