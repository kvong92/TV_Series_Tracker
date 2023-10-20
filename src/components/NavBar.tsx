import React, { useState, useEffect } from 'react';
import {useFirebaseAuth} from "./FirebaseAuthProvider";

function NavBar() {
    const userContext = useFirebaseAuth();
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        if (userContext.user) {
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
    }, [userContext.user]);

    return (
        <>
            <div className="md:block hidden">
                {loggedIn ? (
                    <div className="flex flex-row items-center justify-end bg-white">
                        <a href="/profile" className="block p-4 hover:bg-gray-200">Profile</a>
                        <a href="/calendrier" className="block p-4 hover:bg-gray-200">Calendrier</a>
                        <a href="/signout" className="block p-4 hover:bg-gray-200">Déconnexion</a>
                    </div>
                ) : (
                    <div className="flex flex-row align-middle justify-end bg-white">
                        <a href="/connexion" className="block p-4 hover:bg-gray-200">Connexion</a>
                        <a href="/inscription" className="block p-4 hover:bg-gray-200">Inscription</a>
                    </div>
                )}
            </div>

        </>

    );
}

export default NavBar;