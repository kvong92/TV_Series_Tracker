import React, { useState } from "react";

export function InputVisibility() {

    const [input, setInput] = useState("");
    const [divVisibility, setDivVisibility] = useState(false);

    const onChange = (e: any) => {
        setInput(e.target.value)
    }

    const handleOnClick = () => {
        setInput("")
        setDivVisibility(true)
    }

    <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
        {!divVisibility && (
            <button className="w-full bg-yellow-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-black transition duration-300"
                onClick={handleOnClick}
                type="button">
                Edit
            </button>)}
        {divVisibility && (
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="text" id="name" name="name" placeholder="John Doe">
                </input>
            </div>)
        }
        <button
            className="w-full bg-yellow-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-black transition duration-300"
            type="submit">Register</button>
    </form>
}