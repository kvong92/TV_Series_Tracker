import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import EditProfile from './pages/EditProfile'
import DetailSerie from './components/detail_serie';
import Connexion from './components/connexion';
import Inscription from './components/inscription';
import { dbConnect } from './Firebase/firebase';
import SignOutPage from './pages/SignOutPage';
        
export const appFirebase = dbConnect();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <nav className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono" role="navigation">
      <a href="/" className="pl-8">Series</a>
      <div className="px-4 cursor-pointer md:hidden" id="burger">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <div className="pr-8 md:block hidden">
        <a href="/profile" className="p-4">Profile</a>
        <a href="/connexion" className="p-4">Connexion</a>
        <a href="/inscription" className="p-4">Inscription</a>
        <a href="/signout" className="p-4" >Déconnexion</a>
      </div>
    </nav>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/series/:serie_id" element={<DetailSerie />} />

        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path='/signout' element={<SignOutPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
