import React from "react";
import { useSearchParams } from "react-router-dom";

interface PaginationButtonProps {
    text?: string;
    page?: number;
}

export function PaginationButton({text = "next page >", page = 1}:PaginationButtonProps) {
    const [location, setLocation] = useSearchParams()
    return (
        <button className="bg-gray-100 rounded-md p-2" onClick={() => {
            location.set("page", ((location.has("page") ? Number(location.get("page")) : 1) + page).toString());
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
            setLocation(location);
        }}>{text}</button>
    );
}
