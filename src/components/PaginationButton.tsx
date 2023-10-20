import React from "react";
import { useSearchParams } from "react-router-dom";

interface PaginationButtonProps {
    text?: string;
    page?: number;
    categoriesRef?: React.RefObject<HTMLDivElement> | null;
}

export function PaginationButton({text = "next page >", page = 1, categoriesRef = null} : PaginationButtonProps) {
    const [location, setLocation] = useSearchParams()
    return (
        <button className="bg-gray-100 rounded-md p-2" onClick={() => {
            location.set("page", ((location.has("page") ? Number(location.get("page")) : 1) + page).toString());
            setLocation(location);
            if (categoriesRef && categoriesRef.current) categoriesRef.current.scrollIntoView(
                {behavior: "smooth"}
            );
        }}>{text}</button>
    );
}
