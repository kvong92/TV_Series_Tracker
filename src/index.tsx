import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import DetailSerie from './components/detail_serie';
import Connexion from './components/connexion';
import Inscription from './components/inscription';
import {dbConnect} from "./Firebase/firebase";
import {FirebaseAuthProvider} from "./components/FirebaseAuthProvider";

export const appFirebase = dbConnect();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <FirebaseAuthProvider>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/series/:serie_id" element={<DetailSerie />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
            </Routes>
          </BrowserRouter>
      </FirebaseAuthProvider>
  </React.StrictMode>
);
