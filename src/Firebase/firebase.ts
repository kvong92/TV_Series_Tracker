import {initializeApp} from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {collection, Firestore, getDocs} from 'firebase/firestore/lite';

export function dbConnect() {
    const firebaseConfig = {
        apiKey: "AIzaSyDpFfg30TUwjZ9Nf-7Iih0_fmvtavJobrE",
        authDomain: "l2-tv-series-tracker.firebaseapp.com",
        projectId: "l2-tv-series-tracker",
        storageBucket: "l2-tv-series-tracker.appspot.com",
        messagingSenderId: "312498893101",
        appId: "1:312498893101:web:f38243129069d38acc63a4"
    };
    return initializeApp(firebaseConfig);
}

export async function connectUser(email: string, password: string) {
    const auth = getAuth();
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return "User logged in successfully";
    } catch (error: any) {
        return error.message;
    }
}

export async function createUser(db: Firestore, email: string, password: string) {
    const auth = getAuth();

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return "User created successfully";
    } catch (error: any) {
        return error.message;
    }
}

export async function getUserSession() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        return user;
    }
    else {
        console.log("No user logged in");
    }
}

export async function getUsers(db: Firestore) {
    const usersCol = collection(db, 'users');
    await getDocs(usersCol)
        .then((snapshot) => {
            return snapshot.docs.map(doc => doc.data());
        })
}