import show_password from '../images/show-password.svg';
import hide_password from '../images/hide-password.svg';
import React, { useState, useEffect } from 'react';

export default function Inscription() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    }, [name, email, password, confirmationPassword]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

        if (password !== confirmationPassword) {
            setError('Passwords do not match');
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
            id="name" 
            type="text" 
            placeholder="Name"
            className="h-11 py-1.5 px-3 self-stretch items-center rounded-md border-solid border-black border-2 bg-white w-full placeholder:text-stone-700 outline-none"
            onChange={event => setName(event.target.value)}
            required
            />
        </div>
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
        <div>
            <button type="submit" className="bg-yellow-300 rounded-lg py-2.5 px-6 h-10 font-bold">SUBMIT</button>
        </div>
      </form>
    );
  }
  