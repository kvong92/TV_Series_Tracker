import { Link } from "react-router-dom";
import { appFirebase } from '../index';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

function SignOutPage() {
    const db = getFirestore(appFirebase);

    const auth = getAuth();
    auth.signOut().then(() => {
        setTimeout(() => {
            window.location.href = "/connexion";
        }, 5000);
    }).catch((error) => {
        console.log(error);
    });
    return (
        <>
            <div className="w-full max-w-xl mx-auto mt-10 text-white bg-stone-700 p-8 rounded-md shadow-md flex flex-col items-center">
                <h1>Déconnexion en cours ...</h1>
                <p className="mt-10">Vous êtes déconnecté !</p>
                <p className="mt-10 mb-10">Vous allez être rediriger vers la page de connexion dans 5 sec ...</p>
                <Link to="/connexion">Ou cliquez ici pour vous reconnecter</Link>
            </div>
        </>
    );
}

export default SignOutPage;