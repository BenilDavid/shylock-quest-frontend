/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import './Mint.scss';
import logo from '../../shylock-logo.png';
// import twitterIcon from '../../twitter.png';
import openseaIcon from '../../Assets/linkIcons/opensea-logo.png';
import twiterIcon from '../../Assets/linkIcons/twitter.png';
import etherscanIcon from '../../Assets/linkIcons/etherscans-logo.png';
import discordIcon from '../../Assets/linkIcons/discord.png';
import 'animate.css';
import AnalogClock from 'analog-clock-react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

const WindowSize = "1000";

function Mint() {
  let navigate = useNavigate();

  const [analogClockTime, setAnalogClockTime] = useState(
    {
      useCustomTime: true,
      width: "190px",
      border: true,
      borderColor: "#2e2e2e",
      baseColor: "#000",
      centerColor: "#2e2e2e",
      centerBorderColor: "#ff8012",
      handColors: {
        second: "#fff",
        minute: "#ff8012",
        hour: "#ff8012"
      },
      seconds: 1,
      minutes: 10,
      hours: 22
    }
  )

  useEffect(() => {
    // update clock
    setInterval(() => {
      updateClock();
    }, 1000);

  }, [])

  const updateClock = () => {
    let ausTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    let date = new Date(ausTime);

    setAnalogClockTime(
      {
        ...analogClockTime,
        seconds: date.getSeconds(),
        minutes: date.getMinutes(),
        hours: date.getHours()
      }
    )
  }


  return (
    <>
      <motion.div className="App"
        initial={{ opacity: 0, transition: { duration: 0.8 } }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
      >
        <div className="app-container">
          <div className="header d-flex">
            <div className="twitter-id back-btn ms-4">
              {/* <button className="dapp_btn me-4" onClick={() => navigate('/mint')}>
                Mint
              </button> */}
            </div>
            <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} className="shylock-logo" alt="logo" />
            </div>
            <div className="right-header-links me-3">
              <a target="_blank" href="https://opensea.io/collection/shylock" rel="noreferrer">
                <img src={openseaIcon} className="link-icons" alt="opensea" />
              </a>
              <a target="_blank" href="https://twitter.com/shylocknft" rel="noreferrer">
                <img src={twiterIcon} className="link-icons" alt="twitter" />
              </a>
              <a target="_blank" href="https://etherscan.io/address/0x4cef24c26ba75a1aa0dc866e7ba0b1593e8b3265" rel="noreferrer">
                <img src={etherscanIcon} className="link-icons" alt="etherscan" />
              </a>
              <a target="_blank" href="https://discord.gg/MhS5BtgD" rel="noreferrer">
                <img src={discordIcon} className="link-icons" alt="discord" />
              </a>
            </div>

          </div>

          {/* {window.innerWidth > WindowSize ?
            <> */}
              <div className="analog-clock my-3">
                <AnalogClock {...analogClockTime} />
              </div>

              <div className={`animate__animated animate__fadeInUp animate__delay-1s"`}>
                <button className={`initiate-btn glowing-btn`} onClick={window.innerWidth > WindowSize ? () => navigate('/tunnel') : () => navigate('/minting')}>
                  <span class='glowing-txt'>T<span class='faulty-letter'>U</span>NNEL</span>
                </button>
                <div className={`fs-7 mt-1 better-experience`}>
                </div>
              </div>
            {/* </>
            :
            <> */}
              {/* {"<<Use Desktop for better experience>>"} */}
              {/* <button className="dapp_btn my-3" onClick={() => navigate('/wallet-checker')}>
                Wallet Checker
              </button> */}
            {/* </>
          } */}

          <div className='footer'>
            {/* <button className="twitter-btn">
              <a target="_blank" href="https://twitter.com/shylocknft" rel="noreferrer">
                <img src={twitterIcon} className="twitter-logo" alt="twitter" />
              </a>
            </button> */}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Mint;
