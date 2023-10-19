import React, {useState} from "react";
import {BsCheck, BsPlus} from "react-icons/bs";

export default function FollowButton () {
    const [isFollowed, setIsFollowed] = useState(false)
    return (
       <button className={`absolute right-2 top-2 p-3 rounded-md transition hover:bg-amber-200/75 ${isFollowed ? 'bg-amber-200/75' : 'bg-gray-50/75' }`} onClick={(e) => {
           e.preventDefault();
           e.stopPropagation();
           setIsFollowed(!isFollowed);
       }}>
           {isFollowed ? <BsCheck className="text-xl" /> : <BsPlus className="text-xl" /> }
       </button>
    );
}
