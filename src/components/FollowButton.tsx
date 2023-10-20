import React, {useEffect, useState} from "react";
import {BsCheck, BsPlus} from "react-icons/bs";
import {appFirebase} from "../index";
import {getFirestore, arrayRemove, updateDoc, arrayUnion, Firestore} from "firebase/firestore";
import {useFirebaseAuth, UserDocType} from "./FirebaseAuthProvider";

const handleFollow = async (db: Firestore, userDoc: UserDocType, seriesId: number, setIsFollowed: React.Dispatch<React.SetStateAction<boolean>>) => {
    const userDocData = userDoc?.data();
    const userFollowedSeries = userDocData?.followedSeries ?? [];
    if (userFollowedSeries.includes(seriesId)) {
        // @ts-ignore
        await updateDoc(userDoc.ref, {
            followedSeries: arrayRemove(seriesId)
        })
        userDocData?.followedSeries?.splice(userFollowedSeries.indexOf(seriesId), 1);
        setIsFollowed(false);
    }
    else {
        // @ts-ignore
        await updateDoc(userDoc.ref, {
            followedSeries: arrayUnion(seriesId)
        })
        setIsFollowed(true);
    }
}

export default function FollowButton ({seriesId}: {seriesId: number}) {
    const userContext = useFirebaseAuth();
    const [isFollowed, setIsFollowed] = useState<boolean>( false);
    useEffect(() => {
        setIsFollowed(userContext.userDoc?.data()?.followedSeries?.includes(seriesId) ?? false);
    } , [userContext.userDoc]);
    const db = getFirestore(appFirebase);
    if (userContext.user === null || userContext.userDoc === null) return null;
    return (
       <button className={`absolute right-2 top-2 p-3 rounded-md transition hover:bg-amber-200/75 ${isFollowed ? 'bg-amber-200/75' : 'bg-gray-50/75' }`} onClick={(e) => {
           e.preventDefault();
           e.stopPropagation();
           handleFollow(db, userContext.userDoc, seriesId, setIsFollowed);
       }}>
           {isFollowed ? <BsCheck className="text-xl" /> : <BsPlus className="text-xl" /> }
       </button>
    );
}
