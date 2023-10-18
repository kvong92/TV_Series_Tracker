import { FirebaseApp, initializeApp } from 'firebase/app';
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

export async function getUsers (db: Firestore) {
    const usersCol = collection(db, 'users');
    await getDocs(usersCol)
        .then((snapshot) => {
            const res = snapshot.docs.map(doc => doc.data());
            // console.log(res);
            return res;
        })
}