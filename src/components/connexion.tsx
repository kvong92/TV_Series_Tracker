import show_password from '../images/show-password.svg';
import hide_password from '../images/hide-password.svg';
import React, { useState, useEffect } from 'react';
import { connectUser } from '../Firebase/firebase'
import { getFirestore } from 'firebase/firestore/lite';
import { appFirebase } from '../index';

export default function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setError('');
        setSuccess('');
    }, [email, password]);

    function showPassword() {
        const password = document.getElementById('password') as HTMLInputElement;
        const passwordIcon = document.getElementById('password-login-icon') as HTMLImageElement;
        if (password.type === "password") {
            password.type = "text";
            passwordIcon.src = hide_password;
        } else {
            password.type = "password";
            passwordIcon.src = show_password;
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const message = await connectUser(email, password);

        if (message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
            setError('Trop de tentatives de connexion. Veuillez réessayer plus tard.');
            setSuccess('');
            return;
        } else if (message === 'Firebase: Error (auth/invalid-login-credentials).') {
            setError('Email ou mot de passe incorrect. Veuillez réessayer.');
            setSuccess('');
            return;
        } else if (message === 'User logged in successfully') {
            setSuccess('Vous êtes connecté !');
            setError('');
            return;
        } else if (message === 'Firebase: Error (auth/user-not-found).') {
            setError('L\'utilisateur n\'existe pas. Veuillez réessayer.');
            setSuccess('');
            return;
        } else if (message === 'Firebase: Error (auth/wrong-password).') {
            setError('Mot de passe incorrect. Veuillez réessayer.');
            setSuccess('');
            return;
        } else {
            setError('Une erreur est survenue. Veuillez réessayer plus tard.');
            setSuccess('');
            return;
        }
    }

    return (
        <form className="flex flex-col gap-2 bg-stone-700 w-1/4 items-center p-2.5 shrink-0 h-screen" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-white text-4xl">Sign In</h1>
            <div className="w-full">
                <input
                    type="email"
                    placeholder="Email"
                    className="h-11 py-1.5 px-3 self-stretch items-center rounded-md border-solid border-black border-2 bg-white w-full placeholder:text-stone-700 outline-none"
                    onChange={event => setEmail(event.target.value)}
                    required
                />
            </div>
            <div className="w-full flex flex-row items-center bg-white rounded-md border-solid border-black border-2 py-1.5 px-3 h-11 ">
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="self-stretch items-center w-full placeholder:text-stone-700 outline-none rounded-md"
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                <img id='password-login-icon' src={show_password} alt="show password" className="h-5 w-5" onClick={showPassword} />
            </div>
            <p id="error-login" className='text-red-600 font-bold'>{error}</p>
            <p id="success-login" className='text-green-600 font-bold'>{success}</p>
            <div>
                <button type="submit" className="bg-yellow-300 rounded-lg py-2.5 px-6 h-10 font-bold">SUBMIT</button>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
                <p className="text-white">Vous n'avez pas encore de compte ?</p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
                <a href="/inscription" className="text-white text-align-center"><span className='underline w-full'>Inscrivez-vous !</span></a>
            </div>
        </form>
    );
}