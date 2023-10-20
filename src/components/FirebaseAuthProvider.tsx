import * as React from "react";
import { getAuth } from "firebase/auth";
import { User } from '@firebase/auth-types';
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore-types';
import {collection, Firestore, getDocs, getFirestore, query, where, onSnapshot} from "firebase/firestore";
import {appFirebase} from "../index";

type UserType = User | null;
export type UserDocType = QueryDocumentSnapshot<DocumentData, DocumentData> | null;
export type ContextState = { user: UserType, userDoc: UserDocType };

const FirebaseAuthContext =
    React.createContext<ContextState | undefined>(undefined);

const getUserDoc = async (db: Firestore, user: User) => {
    const queryUser = query(collection(db,'users'), where('uid', '==', user?.uid));
    const querySnapshot = await getDocs(queryUser);
    return querySnapshot.docs[0];
}


const FirebaseAuthProvider = (
        { children }: { children: React.ReactNode }
    ) => {

    const [user, setUser] = React.useState<UserType>(null);
    const [userDoc, setUserDoc] = React.useState<UserDocType>(null);
    const value = { user, userDoc };

    React.useEffect(() => {
        return getAuth().onAuthStateChanged(async (user) => {
            if (user) {
                const db = getFirestore(appFirebase);
                const userDoc = await getUserDoc(db, user as User);
                onSnapshot(userDoc.ref, (doc) => {
                    setUserDoc(doc as unknown as UserDocType);
                } );
            }
            setUser(user as UserType);
        });
    }, []);

    return (
        <FirebaseAuthContext.Provider value={value}>
            {children}
        </FirebaseAuthContext.Provider>
    );
};

function useFirebaseAuth() {
    const context = React.useContext(FirebaseAuthContext);
    if (context === undefined) {
        throw new Error(
            "useFirebaseAuth must be used within a FirebaseAuthProvider"
        );
    }
    return context
}

export { FirebaseAuthProvider, useFirebaseAuth };