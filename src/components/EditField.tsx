import React from 'react';
import { BiSolidEdit, BiSend, BiArrowBack } from 'react-icons/bi';

interface EditFieldProps {
    data: string;
    setData: React.Dispatch<React.SetStateAction<string>>;
    currentPassword: string;
    setCurrentPassword: React.Dispatch<React.SetStateAction<string>>;
    handleUpdate: (newData: string, currentPassword: string) => void;
    type: string;
}

export default function EditField({ data, setData, handleUpdate, currentPassword, setCurrentPassword, type }: EditFieldProps) {
    const [divVisibility, setDivVisibility] = React.useState(false);

    const handleOnClick = () => {
        if (!divVisibility) {
            setDivVisibility(true);
        } else {
            handleUpdate(data, currentPassword);
            setDivVisibility(false);
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto bg-stone-700 p-8 rounded-md shadow-md">
            {!divVisibility ? (
                <div className="w-full max-w-sm mx-auto p-8 flex flex-row justify-between items-center">
                    {type === "email" && (
                        <p className="block text-gray-700 text-2xl font-bold text-white py-2 px-4">
                            {data}
                        </p>
                    )}
                    {type === "password" && (
                        <p className="block text-gray-700 text-2xl font-bold text-white py-2 px-4">
                            ********
                        </p>
                    )}
                    <BiSolidEdit
                        className="text-yellow-300 text-2xl hover:text-green-300 transition duration-300"
                        onClick={handleOnClick}
                    />
                </div>
            ) : (
                <div className="mb-4">
                    <form className="w-full max-w-sm mx-auto p-8 flex flex-row justify-between items-center">
                        <BiArrowBack
                            className="text-yellow-300 text-2xl hover-text-green-300 transition duration-300"
                            onClick={() => setDivVisibility(false)}
                        />
                        <div className="flex flex-col justify-center items-center gap-4">
                            <input
                                className="px-3 py-2 bg-stone-700 border border-gray-300 rounded-md focus:outline-none focus:border-white text-white"
                                type={type}
                                id="data"
                                name="data"
                                placeholder={type === "email" ? "Nouvel email" : "Nouveau mot de passe"}
                                autoComplete='true'
                                onChange={(e) => setData(e.target.value)}
                            />
                            <input
                                className="px-3 py-2 bg-stone-700 border border-gray-300 rounded-md focus:outline-none focus:border-white text-white"
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                autoComplete='true'
                                placeholder="Mot de passe actuel"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <BiSend
                            className="text-yellow-300 text-2xl hover:text-green-300 transition duration-300"
                            onClick={handleOnClick}
                        />
                    </form>
                </div>
            )}
        </div>
    );
}