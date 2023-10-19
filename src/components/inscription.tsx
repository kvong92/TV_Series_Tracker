import show_password from '../images/show-password.svg';
import hide_password from '../images/hide-password.svg';
import React, { useState, useEffect } from 'react';
import { createUser, dbConnect, getUserSession } from '../Firebase/firebase'

export default function Inscription() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setError('');
    }, [email, password, confirmationPassword]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

        if (password !== confirmationPassword) {
            setError('Le mot de passe et la confirmation ne correspondent pas. Veuillez réessayer.');
            return;
        }

        const db = dbConnect();
        const message = await createUser(db, email, password);

        if (message === 'Firebase: Error (auth/email-already-in-use).'){
            setError('Email déjà utilisé. Veuillez réessayer.');
            setSuccess('');
            return;
        } else if (message === 'Firebase: Error (auth/invalid-email).'){
            setError('Email invalide. Veuillez réessayer.');
            setSuccess(''); 
            return;
        } else if (message === 'Firebase: Error (auth/weak-password).'){
            setError('Mot de passe trop faible. Veuillez réessayer.');
            setSuccess('');
            return;
        } else if (message === 'User created successfully') {
            setSuccess('Vous êtes inscrit !');
            setError('');
            return;
        } else if (message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            setError('Le mot de passe doit contenir au moins 6 caractères. Veuillez réessayer.');
            setSuccess('');
            return;
        }else {
            setError('Une erreur est survenue. Veuillez réessayer plus tard.');
            setSuccess('');
            return;
        }
    }

    function showPassword() {
        const password = document.getElementById('password') as HTMLInputElement;
        const passwordIcon = document.getElementById('password-register-icon') as HTMLImageElement;
        if (password.type === "password") {
            password.type = "text";
            passwordIcon.src = hide_password;
        } else {
            password.type = "password";
            passwordIcon.src = show_password;
        }
    }

    function showConfirmationPassword() {
        const password = document.getElementById('passwordConfirmation') as HTMLInputElement;
        const passwordConfirmationIcon = document.getElementById('password-confirmation-register-icon') as HTMLImageElement;
        if (password.type === "password") {
            password.type = "text";
            passwordConfirmationIcon.src = hide_password;
        } else {
            password.type = "password";
            passwordConfirmationIcon.src = show_password;
        }
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-stone-700 w-1/4 items-center p-2.5 shrink-0 h-screen">
        <h1 className="text-3xl font-bold text-white text-4xl">Register</h1>
        <div className="w-full">
            <input 
            id="email" 
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
            <img id='password-register-icon' src={show_password} alt="show password" className="h-5 w-5" onClick={showPassword}/>
        </div>
        <div className="w-full flex items-center flex-row bg-white rounded-md border-solid border-black border-2 py-1.5 px-3 h-11">
            <input 
            id="passwordConfirmation" 
            type="password" 
            placeholder="Password Confirmation"
            className="self-stretch items-center w-full placeholder:text-stone-700 outline-none rounded-md"
            onChange={event => setConfirmationPassword(event.target.value)}
            required
            />
            <img id='password-confirmation-register-icon' src={show_password} alt="show password" className="h-5 w-5" onClick={showConfirmationPassword} />
        </div>
        <p id="error-register" className='text-red-600 font-bold'>{error}</p>
        <p id="success-register" className='text-green-600 font-bold'>{success}</p>
        <div>
            <button type="submit" className="bg-yellow-300 rounded-lg py-2.5 px-6 h-10 font-bold">SUBMIT</button>
        </div>
        <p className='text-white'>Vous avez déjà un compte ? <span className='hover:underline'>connectez-vous !</span></p>
      </form>
    );
  }
  