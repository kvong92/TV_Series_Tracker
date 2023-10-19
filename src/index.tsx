import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import DetailSerie from './components/detail_serie';
import Calendrier from './components/calendar';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/series/:serie_id" element={<DetailSerie />} />
            <Route path="/calendrier" element={<Calendrier />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
