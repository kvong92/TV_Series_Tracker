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

                {LoggedIn &&
                    <div>
                        <a href="/profile" className="p-4">Profile</a>
                        <a href="/signout" className="p-4" >Déconnexion</a>
                    </div>}
                {!LoggedIn &&
                    <div>
                        <a href="/connexion" className="p-4">Connexion</a>
                        <a href="/inscription" className="p-4">Inscription</a>
                    </div>}
            </div>
        </>

    );
}

export default NavBar;