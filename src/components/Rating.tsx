import React, { useState } from 'react';

interface SeriesCardProps {
    series: Series,
}

function Rating({ series }: SeriesCardProps) {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRating: number = parseInt(event.target.value, 10);
        setRating(newRating);
        sendData(newRating);
    }

    const sendData = (newRating: number) => {
        console.log(`Sending rating: ${newRating}`);
    };

    return (
        <div className="flex flex-col items-center">
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
