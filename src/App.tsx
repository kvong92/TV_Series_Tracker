import React from 'react';
import logo from './logo.svg';
import './App.css';

import { getUsers, dbConnect } from '../src/Firebase/firebase'

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


export default function App() {
  const db = dbConnect();
  getUsers(db);

  return (
    <h1 className="text-3xl font-bold ">
      Hello world!
    </h1>
  )
}