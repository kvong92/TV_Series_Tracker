import React from 'react';
import './App.css';

import { getUsers, dbConnect } from '../src/Firebase/firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import EditProfile from './pages/EditProfile'

export default function App() {
  const db = dbConnect();
  const users = getUsers(db);
  console.log(users);

  return (
    <>
      <h1 className="text-3xl font-bold ">
        Hello world!
      </h1>
      <br></br>
      <EditProfile />
    </>
  )
}