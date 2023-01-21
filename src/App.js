/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import './App.scss';
import logo from './shylock-logo.png';
import twitterIcon from './twitter.png';
// import PuzzleImage from './Assets/puzzle-6-BW.png';
import tickIcon from './Assets/checked.png';
import 'animate.css';
import AnalogClock from 'analog-clock-react';
import Modal from "./components/common/Modal";
import { useNavigate } from "react-router-dom";
// firebase
import { signOut, getRedirectResult, signInWithRedirect, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { authentication } from './firebase-config';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Web3 from 'web3';
import axios from 'axios';

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

const WindowSize = "1000";

function App() {
  let navigate = useNavigate();
  const address = useAddress();
  const provider = new TwitterAuthProvider();

  const [balance, setBalance] = useState(0);

  const [isOpenLogin, setisOpenLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [shake, setShake] = useState(false);
  const [allRecords, setallRecords] = useState([]);

  const [analogClockTime, setAnalogClockTime] = useState(
    {
      useCustomTime: true,
      width: "130px",
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
    // setTimerFunction();
    if (window.innerWidth < WindowSize) {
      getRedirectResult(authentication)
        .then((result) => {
          // console.log(result);
          if (result) {
            setUser(result.user);
          }
        }).catch((error) => {
          console.log(error);
        });
    }
    // update clock
    setInterval(() => {
      updateClock();
    }, 1000);

  }, [])

  useEffect(() => {
    getBalance();
    getAllRecords();
    // eslint-disable-next-line array-callback-return
    allRecords.map((data) => {
      if (data.metamaskId === address) {
        console.log("user already available");
      }
    })
  }, [address])


  const getBalance = async () => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const balance = await web3.eth.getBalance(accounts[0])
    const etherBalance = web3.utils.fromWei(balance, 'ether')
    setBalance(etherBalance);
  }

  // getAllRecords
  const getAllRecords = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/submit-form/getRecords`);
      setallRecords(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

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

  const handleTwitterLogin = () => {

    if (window.innerWidth >= WindowSize) {
      signInWithPopup(authentication, provider)
        .then((result) => {
          const user = result.user;
          setUser(user);
        }).catch((error) => {
          console.log(error);
        });
    } else {
      signInWithRedirect(authentication, provider);
    }
  }

  const handleTwitterLogout = () => {
    signOut(authentication).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
    setUser(null);
  }

  const enterDarkRoom = () => {

    if (address && user) {
      navigate('/chapter', { state: { metamaskId: address, twitterData: user ? user.providerData : 0, walletAmount: balance } });
      // Initiation();
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
    }
  }

  return (
    <>
      <div className="App">
        <div className="app-container">
          <div className="header d-flex">
            <div className="twitter-id back-btn ms-3">
           
            </div>
            <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} className="shylock-logo" alt="logo" />
            </div>
            <div className={`metakey me-2 ${address ? "border-orange" : ""}`}>
              {address
                ? address.slice(0, 5) + "..." + address.slice(-5)
                : ""}
            </div>
          </div>
          {/* <div className="explore-page-content"> */}

          {/* {console.log(window.innerWidth)} */}
          {window.innerWidth > WindowSize ?
            <>
              <div className="analog-clock my-3">
                <AnalogClock {...analogClockTime} />
              </div>

              <div className={`begin-btn animate__animated animate__fadeInUp animate__delay-1s"`}>
                <button className={`initiate-btn`} onClick={() => setisOpenLogin(!isOpenLogin)}>EXPLORE</button>
                <div className={`fs-7 mt-1 better-experience`}>
                </div>
              </div>
              </>
            :
            "<<Use Desktop for better experience>>"
          }

          <div className='footer'>
            <button className="twitter-btn">
              <a target="_blank" href="https://twitter.com/shylocknft" rel="noreferrer">
                <img src={twitterIcon} className="twitter-logo" alt="twitter" />
              </a>
            </button>
          </div>

          <Modal
            isOpen={isOpenLogin}
            toggle={() => setisOpenLogin(!isOpenLogin)}
            size="md"
            headTitle="CONNECT"
          >
            <div className="login-box">
              <ConnectWallet
                accentColor="#000"
              />
              {window.innerWidth < WindowSize ?
                ""
                :
                <div className={`twitter-box ${user ? "border-green" : ""}`} onClick={!user ? handleTwitterLogin : handleTwitterLogout}>
                  {user ? <img className="tick-icon" src={tickIcon} alt="" /> : ""}
                  <span>{user ? "Connected" : "Connect Twitter"}</span>
                  {/* <img className="ms-4 twitter-icon" src={twitterBlueIcon} alt="" /> */}
                </div>
              }

            </div>
            <div className="d-flex justify-content-center align-items-center my-3">
              <button className={`enter-btn ${shake ? "animate__animated animate__shakeX" : ""}`} onClick={enterDarkRoom}> THE DARK ROOM </button>
            </div>
            {/* {address && user ? "" : <p className="text-center">connections not verified</p>} */}
          </Modal>
        </div>

      </div>
    </>
  );
}

export default App;
