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

export default function App() {
  return (
    <div className='flex items-center'>
      <Connexion />
    </div>
  )
}