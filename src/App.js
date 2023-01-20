/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import './App.scss';
import logo from './shylock-logo.png';
import twitterIcon from './twitter.png';
import whiteLock from './Assets/white-lock.png';
// import PuzzleImage from './Assets/puzzle-6-BW.png';
import tickIcon from './Assets/checked.png';
import ReactPlayer from 'react-player';
import Bgm from './Audio/shylock-bgm.mp3';
import JasperVoiceWave from './Audio/jasper-quest-end.mp4';
import Typewriter from 'typewriter-effect';
import 'animate.css';
import AnalogClock from 'analog-clock-react';
import Modal from "./components/common/Modal";
import { useNavigate } from "react-router-dom";
// firebase
import { signOut, getRedirectResult, signInWithRedirect, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { authentication } from './firebase-config';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
// import Web3 from 'web3';

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const WindowSize = "600";

function App() {
  let navigate = useNavigate();
  const address = useAddress();
  const provider = new TwitterAuthProvider();

  const [isOpenLogin, setisOpenLogin] = useState(false);
  // const [isOpenSubmitPopup, setisOpenSubmitPopup] = useState(false);
  const [isOpenDayPopup, setisOpenDayPopup] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  // const [typingAudio, setTypingAudio] = useState(false);
  // const [bgmAudio, setBgmAudio] = useState(false);
  const [portionCount, setportionCount] = useState(-1);
  const [user, setUser] = useState(null);
  // const [address, setMetaKey] = useState(null);
  const [shake, setShake] = useState(false);
  // const [formData, setFormData] = useState({
  //   twitter: null,
  //   twitterUserName: "",
  //   metamaskId: "",
  //   answer: "",
  //   alias: "",
  //   walletAmount: ""
  // });

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

  // useEffect(() => {
  //   getBalance();
  // }, [address])

  useEffect(() => {
    console.log("address", address);
    console.log("user", user);
    // setFormData((prev) => {
    //   return { ...prev, "metamaskId": address, "twitter": user }
    // })
  }, [user, address])

  // const getBalance = async () => {
  //   const web3 = new Web3(window.ethereum)
  //   const accounts = await web3.eth.getAccounts()
  //   const balance = await web3.eth.getBalance(accounts[0])
  //   const etherBalance = web3.utils.fromWei(balance, 'ether')
  //   setFormData((prev) => {
  //     return { ...prev, "walletAmount": etherBalance }
  //   })
  // }

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

  const daysData = [
    {
      id: 1,
      day: "HIDEOUT",
      isOpen: true,
    },
    {
      id: 2,
      day: "LOCKER",
      isOpen: true,
    },
    {
      id: 3,
      day: "HELIPAD",
      isOpen: true,
    },
    {
      id: 4,
      day: "MEETAGENTS",
      isOpen: true,
    },
    {
      id: 5,
      day: "BIKE",
      isOpen: true,
    },
    {
      id: 6,
      day: "CAR CHASE",
      isOpen: true,
    },
    {
      id: 7,
      day: "DRAINAGE",
      isOpen: true,
    },
    {
      id: 8,
      day: "TUNNEL",
      isOpen: true,
    },
    {
      id: 9,
      day: "LIBRARY",
      isOpen: true,
    },
    {
      id: 10,
      day: "PRISON",
      isOpen: true,
    },
  ]

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
    if (window.innerWidth < WindowSize) {
      if (address) {
        Initiation();
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 500);
      }
    } else {
      if (address && user) {
        Initiation();
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 500);
      }
    }
  }

  const Initiation = () => {
    setisOpenLogin(false);
    setTimeout(() => {
      setportionCount(0);
    }, 500);
  }

  // const onDayClicked = () => {
  //   setportionCount(1);
  // }

  // const handlePuzzleDownload = () => {
  //   const a = document.createElement('a');
  //   a.href = PuzzleImage;
  //   a.download = 'Shylock’s Quest Day 6.jpg';
  //   a.click();
  // }

  const jasperVideoEnded = () => {
    setHideVideo(true);
  }

  return (
    <>
      <div className="App">
        <div className="app-container">
          <div className="header d-flex">
            <div className="twitter-id back-btn ms-3">
              {portionCount === 1 ? <div className="back-arrow d-flex align-items-center justify-content-center" onClick={() => setportionCount(0)}>
                <span>{'<<'}</span>
              </div> : ""}
            </div>
            <div className="logo-container cursor-pointer" onClick={() => setportionCount(-1)}>
              <img src={logo} className="shylock-logo" alt="logo" />
            </div>
            <div className={`metakey me-2 ${address ? "border-orange" : ""}`}>
              {address
                ? address.slice(0, 5) + "..." + address.slice(-5)
                : ""}
            </div>
          </div>

          <div className={`begin-btn  ${portionCount !== -1 ? "d-none" : "animate__animated animate__fadeInUp animate__delay-1s"}`}>
            <button className={`initiate-btn`} onClick={() => setisOpenLogin(!isOpenLogin)}>BEGIN</button>

            <div className={`fs-7 mt-1 better-experience`}>
              {window.innerWidth < WindowSize ?
                "<<Use desktop for better experience>>"
                : ""}
            </div>
          </div>

          {portionCount !== -1 ?
            <>
              <ReactPlayer className="d-none" url={Bgm} playing={true} controls={false} volume={1} muted={false} loop={true} />
            </> : ""
          }
          {/* <button className={`initiate-btn  ${portionCount === 0 ? "animate__animated animate__fadeOut d-none" : portionCount !== -1 ? "d-none" : "animate__animated animate__fadeInUp animate__delay-1s"}`} onClick={Initiation}> ENTER THE SHADES </button> */}

          {portionCount !== -1 ?
            <>
              {/* <ReactPlayer className="d-none" url={Bgm} playing={true} controls={false} volume={1} muted={false} loop={true} /> */}

              <div className="internal-content">
                {portionCount === 0 ?
                  <>
                    <div className="upper-portion-1">
                      <div className={`video-container ${hideVideo ? "d-none" : ""}`}>
                        <ReactPlayer className={`jasper-video`} url={JasperVoiceWave} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true} onEnded={jasperVideoEnded} />
                      </div>

                      <Typewriter
                        onInit={(typewriter) => {
                          typewriter
                            // .pauseFor(400)
                            .typeString(" Agents, as Shylock enters The Hideout you will be posed with more interesting and intriguing missions to solve. But before that, Shylock would like to reward the Agents exclusively for their support in helping him identify the members of the SERA Gang.")
                            // .pauseFor(1000)
                            // .typeString(" Let’s get to work.")
                            .start();
                        }}
                        options={{
                          loop: false,
                          delay: 40,
                          pauseFor: 100000,
                        }}
                      />
                    </div>
                    <div className="row bottom-portion-1">
                      <div className="col-lg-3 analog-clock my-3">
                        {/* <Timer /> */}
                        {/* <div className="my-2" id="timer-value"></div> */}
                        <AnalogClock {...analogClockTime} />
                      </div>

                      <div className="col-lg-8 days-box-container my-3">
                        <span className="days-heading">Quests</span>
                        <div style={{ height: "80%" }} className="d-flex align-items-center">
                          <div className="days-container">
                            {daysData.map(({ id, day, isOpen }) => {
                              return <>
                                <div key={id} className={`days-box ${isOpen ? "unlocked-day" : "locked-day"}`} onClick={() => navigate(`/chapter/${id}`, { state: { metamaskId: address, twitterData: user ? user.providerData : 0 } })}>
                                  {/* <Tooltip className="custom-tooltip" anchorId={`day-${day}`}  /> */}
                                  {!isOpen ?
                                    <img className="locked-image" src={whiteLock} alt="" />
                                    : ""}
                                  <span>{day}</span>
                                  <div class={`line-arrow-${id}`}></div>
                                </div>
                              </>
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-1 time-box-container my-3">
                      </div>
                    </div>
                  </>
                  : ""}
              </div>
            </>
            : ""}

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
          <Modal
            isOpen={isOpenDayPopup}
            toggle={() => setisOpenDayPopup(!isOpenDayPopup)}
            size="md"
            headTitle="CHAPTER LOADING..."
          >
            <div className="orange-text text-center mt-2">Keep an eye out. The Hideout will be revealed soon.</div>
            <div className="d-flex justify-content-center align-items-center my-3">
              <a target="_blank" href="https://twitter.com/intent/tweet?text=Bring%20it%20on.%20We%20are%20waiting%20%40shylocknft.%0a%0a%23SolvewithShylock" rel="noreferrer">
                <button className='enter-btn'>{`>> Tweet <<`}</button>
              </a>
            </div>
          </Modal>
        </div>

      </div>
    </>
  );
}

export default App;
