import React, { useState, useEffect } from 'react';
import EditField from '../components/EditField';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from "firebase/auth";
import { signOutUser } from '../Firebase/firebase';

export default function EditProfile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState(''); 

    const auth = getAuth();
    const user = auth.currentUser;

    async function handleEmailUpdate(newEmail: string) {
        if (user && user.email) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            verifyBeforeUpdateEmail(user, newEmail)
                .then(() => {
                    console.log('Email address updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating email address:', error);
                });
        }
    }

    async function handlePasswordUpdate(newPassword: string) {
        console.log(newPassword);
        if (user && user.email) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            updatePassword(user, newPassword)
                .then(() => {
                    console.log('Password updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating password:', error);
                });
        }
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
                    <div className="w-full max-w-xl mx-auto bg-stone-700 p-8 rounded-md shadow-md">
                        <button onClick={signOutUser} className="text-yellow-300 text-2xl hover:text-green-300 transition duration-300"
                        >Sign Out</button>
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
                    </div>
                </div>
            </div>
        </div>
    );
}