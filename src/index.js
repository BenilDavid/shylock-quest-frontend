import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "core-js/stable";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestImagePage from './components/QuestImagePage/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/quest-puzzle" element={<QuestImagePage />} />
      </Routes>
    </BrowserRouter>
  </>
);

