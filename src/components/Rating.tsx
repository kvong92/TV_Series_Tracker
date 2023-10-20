import React, { useState } from 'react';

import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc } from "firebase/firestore";
import { getFirestore, collection, addDoc, updateDoc, getDocs } from 'firebase/firestore';

interface SeriesCardProps {
    idSerie: any;
}

function Rating({ idSerie }: SeriesCardProps) {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRating: number = parseInt(event.target.value, 10);
        setRating(newRating);
        sendData(newRating);
    }

    async function updateNotificationPreference(email: string, toogleEnable: boolean) {
        const authInstance = getAuth();
        const currentUser = authInstance.currentUser;

        try {
            if (currentUser) {
                const db = getFirestore();
                const usersCollection = collection(db, 'users');
                const getUsersCol = await getDocs(usersCollection);

                let userId = null;
                getUsersCol.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.email === email) {
                        userId = doc.id;
                    }
                });

                if (userId) {
                    const userDocRef = doc(usersCollection, userId);

                    const updatedData = {
                        enableNotification: toogleEnable,
                    };

                    try {
                        await updateDoc(userDocRef, updatedData);
                    } catch (error) {
                        console.log("Erreur lors de la mise à jour de la préférence de notification: ", error);
                    }
                } else {
                    console.log("Utilisateur non trouvé");
                }
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const sendData = (newRating: number) => {
        console.log(`Sending rating: ${newRating}`);
        console.log(`Sending idSerie: ${idSerie}`);

    };

    return (
        <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-white">
                Current Rating : {rating}/4
            </div>
            <div className="flex flex-row items-center">
                <label>
                    <input
                        type="radio"
                        value="1"
                        checked={rating === 1}
                        onChange={handleRatingChange}
                        className="sr-only"
                    />
                    <span className={`text-5xl ${rating >= 1 ? 'text-yellow-300' : 'text-gray-500'} cursor-pointer`}>★</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value="2"
                        checked={rating === 2}
                        onChange={handleRatingChange}
                        className="sr-only"
                    />
                    <span className={`text-5xl ${rating >= 2 ? 'text-yellow-300' : 'text-gray-500'} cursor-pointer`}>★</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value="3"
                        checked={rating === 3}
                        onChange={handleRatingChange}
                        className="sr-only"
                    />
                    <span className={`text-5xl ${rating >= 3 ? 'text-yellow-300' : 'text-gray-500'} cursor-pointer`}>★</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value="4"
                        checked={rating === 4}
                        onChange={handleRatingChange}
                        className="sr-only"
                    />
                    <span className={`text-5xl ${rating >= 4 ? 'text-yellow-300' : 'text-gray-500'} cursor-pointer`}>★</span>
                </label>
            </div>
        </div>
    );
}

export default Rating;