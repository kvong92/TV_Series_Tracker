import show_password from '../images/show-password.svg';
import hide_password from '../images/hide-password.svg';
import React, { useState, useEffect } from 'react';
import { createUser, dbConnect, getUserSession } from '../Firebase/firebase'
import { Link } from "react-router-dom";
import { appFirebase } from '../index';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import Rating from './Rating';

function NavBar() {
    const db = getFirestore(appFirebase);
    const auth = getAuth();
    const user = auth.currentUser;

    var LoggedIn;
    if (user) {
        LoggedIn = true;
    } else {
        LoggedIn = false;
    }

    return (
        <>
            <div className="pr-8 md:block hidden">
                {LoggedIn ? (
                    <div className="space-y-2 flex flex-col">
                        <a href="/profile" className="block p-4 hover:bg-gray-200">Profile</a>
                        <a href="/signout" className="block p-4 hover:bg-gray-200">Déconnexion</a>
                    </div>
                ) : (
                    <div className="space-y-2 flex flex-col">
                        <a href="/connexion" className="block p-4 hover:bg-gray-200">Connexion</a>
                        <a href="/inscription" className="block p-4 hover:bg-gray-200">Inscription</a>
                    </div>
                )}
            </div>

        </>

    );
}

export default NavBar;