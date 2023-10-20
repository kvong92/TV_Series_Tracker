import React, { useState, useEffect } from 'react';
import EditField from '../components/EditField';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc } from "firebase/firestore";
import { dbConnect } from '../Firebase/firebase'
import { getFirestore, collection, addDoc, updateDoc, getDocs } from 'firebase/firestore';

export default function EditProfile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [emailUpdateError, setEmailUpdateError] = useState(null);
    const [passwordUpdateError, setPasswordUpdateError] = useState(null);
    const [enableNotification, setEnableNotification] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    async function handleEmailUpdate(newEmail: string) {
        if (user && user.email) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            try {
                await reauthenticateWithCredential(user, credential);
                verifyBeforeUpdateEmail(user, newEmail)
                    .then(() => {
                        return "L'adresse e-mail mise à jour avec succès";
                    })
                    .catch((error: any) => {
                        const messageError: any = setEmailUpdateError(error.message);
                        const notify = () => toast(messageError);
                        notify();
                    });
            } catch (error: any) {
                const messageError: any = setEmailUpdateError(error.message);
                const notify = () => toast("Erreur lors de la mise à jour de l'adresse e-mail");
                notify();
            }
        }
    }

    async function handlePasswordUpdate(newPassword: string) {
        console.log(newPassword);
        if (user && user.email) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            try {
                await reauthenticateWithCredential(user, credential);
                updatePassword(user, newPassword)
                    .then(() => {
                        return "Le mot de passe a été modifié avec succès";
                    })
                    .catch((error: any) => {
                        // console.error('Error updating password:', error);
                        setPasswordUpdateError(error.message);
                    });
            } catch (error: any) {
                // console.error(error);
                const messageError: any = setPasswordUpdateError(error.message);
                const notify = () => toast("Erreur lors de la mise à jour du mot de passe");
                notify();
            }
        }
    }

    async function updateNotificationPreference(email: string, toogleEnable: boolean) {
        const authInstance = getAuth();
        const currentUser = authInstance.currentUser;

        try {
            if (currentUser) {
                const db = getFirestore();
                const usersCollection = collection(db, 'users');
                const getUsersCol = await getDocs(usersCollection);

                let userId = null;
                getUsersCol.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.email === email) {
                        userId = doc.id;
                    }
                });

                if (userId) {
                    const userDocRef = doc(usersCollection, userId);

                    const updatedData = {
                        enableNotification: toogleEnable,
                    };

                    try {
                        await updateDoc(userDocRef, updatedData);
                    } catch (error) {
                        console.log("Erreur lors de la mise à jour de la préférence de notification: ", error);
                    }
                } else {
                    console.log("Utilisateur non trouvé");
                }
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    function handleNotification() {
        const newEnableNotification = !enableNotification;
        updateNotificationPreference(email, newEnableNotification);
        setEnableNotification(newEnableNotification);
    }

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setEmail(user.email || '');
            } else {
                setEmail('');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-8">

                    <h1 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h1>
                    <div className="w-full max-w-xl mx-auto bg-stone-700 p-8 rounded-md shadow-md flex flex-col items-center">
                        <ToastContainer
                            position="top-center"
                            autoClose={false}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <p className="text-white text-2xl mt-5 text-center underline">Email</p>
                        <EditField
                            type="email"
                            data={email}
                            setData={setEmail}
                            handleUpdate={handleEmailUpdate}
                            currentPassword={currentPassword}
                            setCurrentPassword={setCurrentPassword} />
                        <p className="text-white text-2xl mt-5 text-center underline">Password</p>
                        <EditField
                            type="password"
                            data={password}
                            setData={setPassword}
                            handleUpdate={handlePasswordUpdate}
                            currentPassword={currentPassword}
                            setCurrentPassword={setCurrentPassword} />
                        <label className="relative inline-flex items-center mr-5 cursor-pointer mt-5">
                            <input type="checkbox" value=""
                                className="sr-only peer"
                                checked={enableNotification}
                                onChange={handleNotification} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Autoriser les notifications</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}