import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';

export function dbConnect() {
    const firebaseConfig = {
        apiKey: "AIzaSyDpFfg30TUwjZ9Nf-7Iih0_fmvtavJobrE",
        authDomain: "l2-tv-series-tracker.firebaseapp.com",
        projectId: "l2-tv-series-tracker",
        storageBucket: "l2-tv-series-tracker.appspot.com",
        messagingSenderId: "312498893101",
        appId: "1:312498893101:web:f38243129069d38acc63a4"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return db;
}

export async function connectUser(db: Firestore, email: string, password: string) {
    const auth = getAuth();
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return "User logged in successfully";
    } catch (error: any) {
        const errorMessage = error.message;
        return errorMessage;
    }
}



export async function createUser(db : Firestore, email: string, password: string){
    const auth = getAuth();

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return "User created successfully";
    } catch (error: any) {
        const errorMessage = error.message;
        return errorMessage;
    }
}
    

export async function getUserSession(db :Firestore){
    const auth = getAuth();
    const user = auth.currentUser;
    if(user){
        console.log(user);
    }
    else{
        console.log("No user logged in");
    }
}