// import React from 'react';
// import './App.css';

// export default function App() {
//   return (
//     <h1 className="text-3xl font-bold ">
//       Hello world!
//     </h1>
//   )
// }

import React from 'react';
import './App.css';
import Inscription from './components/inscription';
import Connexion from './components/connexion';

import { getUsers, dbConnect } from '../src/Firebase/firebase'

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


export default function App() {
  const db = dbConnect();
  getUsers(db);

  return (
    <div className='flex items-center'>
      <Connexion />
    </div>
  )
}