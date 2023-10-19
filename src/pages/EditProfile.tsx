import React, { useState, useEffect } from 'react';
import EditField from '../components/EditField';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from "firebase/auth";
import { signOutUser } from '../Firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [emailUpdateError, setEmailUpdateError] = useState(null);
    const [passwordUpdateError, setPasswordUpdateError] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    async function handleEmailUpdate(newEmail: string) {
        if (user && user.email) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            try {
                await reauthenticateWithCredential(user, credential);
                verifyBeforeUpdateEmail(user, newEmail)
                    .then(() => {
                        // console.log('Email address updated successfully');
                        return "Email address updated successfully";
                    })
                    .catch((error: any) => {
                        // console.error('Error updating email address:', error);
                        const messageError: any = setEmailUpdateError(error.message);
                        const notify = () => toast(messageError);
                        notify();
                    });
            } catch (error: any) {
                // console.error(error);
                const messageError: any = setEmailUpdateError(error.message);
                const notify = () => toast("Error updating email address");
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
                        // console.log('Password updated successfully');
                        return "Password updated successfully";
                    })
                    .catch((error: any) => {
                        // console.error('Error updating password:', error);
                        setPasswordUpdateError(error.message);
                    });
            } catch (error: any) {
                // console.error(error);
                const messageError: any = setPasswordUpdateError(error.message);
                const notify = () => toast("Error updating password");
                notify();
            }
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
                        <ToastContainer
                            position="top-center"
                            // autoClose={5000}
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
                        {/* {emailUpdateError && <p className="text-red-500"></p>} */}
                        <p className="text-white text-2xl mt-5 text-center underline">Password</p>
                        <EditField
                            type="password"
                            data={password}
                            setData={setPassword}
                            handleUpdate={handlePasswordUpdate}
                            currentPassword={currentPassword}
                            setCurrentPassword={setCurrentPassword} />
                        {/* {passwordUpdateError && <p className="text-red-500">{passwordUpdateError}</p>} */}
                    </div>
                </div>
            </div>
        </div>
    );
}