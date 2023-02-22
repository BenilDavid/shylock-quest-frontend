import React, { useState } from "react";
import logo from '../../shylock-logo.png';
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ReactPlayer from 'react-player';
import TunnelCallVideo from '../../Video/Dapp/call-tunnel.mp4';
import TunnelCallAudio from '../../Video/Dapp/call-tunnel-audio.mp3';
import TunnelBgm from '../../Video/Dapp/dapp-bgm.mp3';

import './Dapp.scss';

const DappPage = () => {
    let navigate = useNavigate();
    const { state: { metamaskId } } = useLocation();
const [dappBgm, setDappBgm] = useState(false);
    const tunnelAudioEnded = () => {
        setDappBgm(true);
    }

    return (
        <>
            <motion.div className="dapp-container"
                initial={{ opacity: 0, transition: { duration: 0.8 } }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="app-container">
                    <div className="header dapp-header bg-transparent d-flex">
                        <div className="twitter-id back-btn ms-4">
                            <div className="back-arrow d-flex align-items-center justify-content-center" onClick={() => navigate('/')}>
                                <span>{'<<'}</span>
                            </div>
                        </div>
                        <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
                            <img src={logo} className="shylock-logo" alt="logo" />
                        </div>
                        <div className={`metakey me-4 ${metamaskId ? "border-orange" : ""}`}>
                            {metamaskId
                                ? metamaskId.slice(0, 5) + "..." + metamaskId.slice(-5)
                                : ""}
                        </div>
                    </div>
                    <div className="my-3 dapp-video-container">
                    
                    <ReactPlayer className={`dapp-video`} url={TunnelCallVideo} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true} />
                    <ReactPlayer className="d-none" url={TunnelCallAudio} playing={true} controls={false} volume={1} muted={false} loop={false} onEnded={tunnelAudioEnded}/> 
                    <ReactPlayer className="d-none" url={TunnelBgm} playing={dappBgm} controls={false} volume={1} muted={false} loop={true} />
                    </div>

                    {/* <div className='footer dapp_footer'>
                        <button className="twitter-btn">
                            <a target="_blank" href="https://twitter.com/shylocknft" rel="noreferrer">
                                <img src={twitterIcon} className="twitter-logo" alt="twitter" />
                            </a>
                        </button>
                    </div> */}
                </div>

            </motion.div>
        </>
    )
}

export default DappPage;