import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "core-js/stable";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

