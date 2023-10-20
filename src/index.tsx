import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import EditProfile from './pages/EditProfile'
import DetailSerie from './components/detail_serie';
import Calendrier from './components/calendar';
import Connexion from './components/connexion';
import Inscription from './components/inscription';
import { dbConnect } from './Firebase/firebase';
import {FirebaseAuthProvider} from "./components/FirebaseAuthProvider";
import SignOutPage from './pages/SignOutPage';
import NavBar from './components/NavBar';

export const appFirebase = dbConnect();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <FirebaseAuthProvider>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/series/:serie_id" element={<DetailSerie />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path='/signout' element={<SignOutPage />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </FirebaseAuthProvider>
  </React.StrictMode>
);
