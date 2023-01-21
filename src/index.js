import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "core-js/stable";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestImagePage from './components/QuestImagePage/index';
import QuestionPage from './components/QuestionPage/index';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import ChapterPage from './components/ChapterPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/chapter" element={<ChapterPage />} />
          <Route exact path="/chapter/:id" element={<QuestionPage />} />
          <Route exact path="/quest-lore" element={<QuestImagePage />} />
        </Routes>
      </BrowserRouter>
    </ThirdwebProvider>
    {/* <App /> */}

  </>
);

