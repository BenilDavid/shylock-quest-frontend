import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import "core-js/stable";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import AnimatedRoutes from './components/AnimatedRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <BrowserRouter>
       <AnimatedRoutes />
      </BrowserRouter>
    </ThirdwebProvider>
    {/* <App /> */}
  </>
);

