/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import './App.scss';
// import Web3 from 'web3';
import logo from './shylock-logo.png';
import twitterIcon from './twitter.png';
import whiteLock from './Assets/white-lock.png';
// import metamaskIcon from './Assets/fox.png';
import twitterBlueIcon from './Assets/twitter-blue.png';
import QR_Code from './Assets/qr-code-orange.jpeg';
import tickIcon from './Assets/checked.png';
import InfoIcon from './Assets/information-button.png'
import ReactPlayer from 'react-player';
import axios from 'axios';
import Bgm from './Audio/shylock-bgm.mp3';
import JasperVoiceWave from './Audio/audio-wave.mp4';
import question1 from './Audio/questions/question.webm';
import Typewriter from 'typewriter-effect';
import 'animate.css';
import AnalogClock from 'analog-clock-react';
import Modal from "./components/common/Modal";
import PulseLoader from "react-spinners/PulseLoader";
// import { useNavigate } from "react-router-dom";
// import { setCookie, getCookie, deleteCookie } from "./Utils/common";
// firebase

import { signOut, getRedirectResult, signInWithRedirect, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { authentication } from './firebase-config';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Web3 from 'web3'

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

function App() {
  // let navigate = useNavigate();
  const address = useAddress();
  const provider = new TwitterAuthProvider();

  let [loading, setLoading] = useState(false);
  const [isOpenLogin, setisOpenLogin] = useState(false);
  const [isOpenSubmitPopup, setisOpenSubmitPopup] = useState(false);
  const [isAllreadyRecordedData, setIsAllreadyRecordedData] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  // const [typingAudio, setTypingAudio] = useState(false);
  // const [bgmAudio, setBgmAudio] = useState(false);
  const [portionCount, setportionCount] = useState(-1);
  const [user, setUser] = useState(null);
  const [metaKey, setMetaKey] = useState(null);
  const [shake, setShake] = useState(false);
  const [shakeSubmit, setShakeSubmit] = useState(false);
  const [formData, setFormData] = useState({
    twitter: null,
    twitterUserName: "",
    metamaskId: "",
    answer: "",
    alias: "",
    walletAmount: ""
  });
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
    if (window.innerWidth < "700") {
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
    getAllRecords();
    // update clock
    setInterval(() => {
      updateClock();

    }, 1000);

  }, [])

  useEffect(() => {
    // if(address){
    // console.log(address);
    setMetaKey(address);
    getBalance();
    // }
  }, [address])

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, "metamaskId": metaKey, "twitter": user }
    })
    // console.log(portionCount);
  }, [user, metaKey])

  const getBalance = async () => {
    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.getAccounts()
    const balance = await web3.eth.getBalance(accounts[0])
    // console.log(balance);
    const etherBalance = web3.utils.fromWei(balance, 'ether')
    console.log(etherBalance);
    setFormData((prev) => {
      return { ...prev, "walletAmount": etherBalance }
    })
    
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

  const daysData = [
    {
      id: 1,
      day: 1,
      isOpen: true,
    },
    {
      id: 2,
      day: 2,
      isOpen: false,
    },
    {
      id: 3,
      day: 3,
      isOpen: false,
    },
    {
      id: 4,
      day: 4,
      isOpen: false,
    },
    {
      id: 5,
      day: 5,
      isOpen: false,
    },
    {
      id: 6,
      day: 6,
      isOpen: false,
    }
  ]

  const handleTwitterLogin = () => {
    // console.log(authentication, provider);

    if (window.innerWidth >= "700") {
      signInWithPopup(authentication, provider)
        .then((result) => {
          const user = result.user;
          console.log(result);
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
    // deleteCookie("twitterDetails");
  }

  // const handleConnectWallet = async () => {

  //   if (window.ethereum) {
  //     try {
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });

  //       const web3 = new Web3(window.ethereum);
  //       // const web3 = new Web3(Web3.currentProvider);
  //       // console.log(web3.eth.accounts.currentProvider.selectedAddress);
  //       setMetaKey(web3.eth.accounts.currentProvider.selectedAddress);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     console.error('MetaMask is not installed');
  //   }
  // };

  const enterDarkRoom = () => {
    if (window.innerWidth < 700) {
      if (metaKey) {
        Initiation();
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 500);
      }
    } else {
      if (metaKey && user) {
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
    setportionCount(0);
  }

  const onDayClicked = (id) => {
    setportionCount(id);
  }

  const handleFormData = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
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

  // createRecord
  const handleCreateRecord = async () => {
    try {
      await axios.post(`${URL}/api/submit-form`, formData);
      setFormData({ ...formData, answer: "", twitterUserName: "", alias: "" });
      setisOpenSubmitPopup(!isOpenSubmitPopup);
      setLoading(false);
      getAllRecords();
    } catch (error) {
      console.log(error);
    }
  }

  const submitButton = () => {
    // eslint-disable-next-line array-callback-return
    const isRecordedData = allRecords.filter(({ metamaskId, twitter, twitterUserName }, index) => {
      if(window.innerWidth < "700"){
        if (formData.metamaskId === metamaskId || formData.twitterUserName === twitterUserName ) {
          console.log("inside mobile");
          return metamaskId;
        }
      }else{
        if (formData.metamaskId === metamaskId || formData.twitter.uid === twitter.uid ) {
          console.log("inside desktop");
          return metamaskId;
        }
      }
    });
console.log(isRecordedData);
    if (isRecordedData.length === 0) {
      if(window.innerWidth < "700"){
        if (formData.answer !== "" && formData.twitterUserName !== "") {
          setLoading(!loading);
          handleCreateRecord();
        }
        else {
          setShakeSubmit(true);
          setTimeout(() => {
            setShakeSubmit(false);
          }, 500);
        }
      }else{
        if (formData.answer !== "") {
          setLoading(!loading);
          handleCreateRecord();
        }
        else {
          setShakeSubmit(true);
          setTimeout(() => {
            setShakeSubmit(false);
          }, 500);
        }
      }
      
    } else {
      setIsAllreadyRecordedData(true);
    }
  }

  const handleQrDownload = () => {
    const a = document.createElement('a');
    a.href = QR_Code;
    a.download = 'puzzle_1.jpg';
    a.click();
  }

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
            <div className="logo-container cursor-pointer" onClick={() => { setportionCount(-1) }}>
              <img src={logo} className="shylock-logo" alt="logo" />
            </div>
            <div className={`metakey ${metaKey ? "border-orange" : ""}`}>
              {metaKey
                ? metaKey.slice(0, 5) + "..." + metaKey.slice(-5)
                : ""}
            </div>
          </div>

          <button className={`initiate-btn  ${portionCount === 0 ? "animate__animated animate__fadeOut d-none" : portionCount !== -1 ? "d-none" : "animate__animated animate__fadeInUp animate__delay-1s"}`} onClick={() => setisOpenLogin(!isOpenLogin)}>BEGIN</button>

          {/* <button className={`initiate-btn  ${portionCount === 0 ? "animate__animated animate__fadeOut d-none" : portionCount !== -1 ? "d-none" : "animate__animated animate__fadeInUp animate__delay-1s"}`} onClick={Initiation}> ENTER THE SHADES </button> */}

          {portionCount !== -1 ?
            <>
              <ReactPlayer className="d-none" url={Bgm} playing={true} controls={true} volume={1} muted={false} loop={true} />

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
                            .typeString("Agents, the time has come. It is not possible for Detective Shylock to visit The Office anytime soon as he seeks your assistance in gathering the photographic evidences about the SERA and their allies. Let’s get to work.")
                            // .pauseFor(500)
                            // .typeString(' To become an Agent, you must be able to unravel the mysteries with Shylock and help him find ways to solve the investigation.')
                            // .pauseFor(400)
                            // .typeString(' Every participant is considered and rewarded deservingly.')
                            // .pauseFor(800)
                            // .typeString(' When in doubt look out for The Shades.')
                            // .callFunction(() => {
                            //   setTypingAudio(false);
                            // })
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
                        <AnalogClock {...analogClockTime} />
                      </div>

                      <div className="col-lg-6 days-box-container my-3">
                        <span className="days-heading">Daily Quests</span>
                        <div style={{ height: "80%" }} className="d-flex align-items-center">
                          <div className="days-container">
                            {daysData.map(({ id, day, isOpen }) => {
                              return <div key={id} className={`days-box ${isOpen ? "unlocked-day" : "locked-day"}`} onClick={isOpen ? () => onDayClicked(id) : ""}>
                                {!isOpen ?
                                  <img className="locked-image" src={whiteLock} alt="" />
                                  : ""}
                                <span>{day}</span>
                              </div>
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 time-box-container my-3">
                        <div>
                          <div>QUEST LIVE:</div>
                          <div>9:00 AM - 11:00 AM EST</div>
                          <div>9:00 PM - 11:00 PM EST</div>
                        </div>
                      </div>
                    </div>
                  </>
                  : portionCount === 1 ?
                    <>
                      <div className="upper-portion-2">
                        <div className="riddle-container">
                          <div className="riddle-heading">{'<<Quest: 1>>'}</div>
                          <Typewriter
                            onInit={(typewriter) => {
                              typewriter
                                .typeString("Agents, you must seek for the hidden clues and enter them down here before getting your hands on the evidence.")
                                // .callFunction(() => {
                                //   setTypingAudio(false);
                                // })
                                .start();
                            }}
                            options={{
                              loop: false,
                              delay: 40,
                              pauseFor: 100000,
                            }}
                          />
                          <ReactPlayer className={`jasper-video`} url={question1} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true} onEnded={jasperVideoEnded} />
                        </div>
                      </div>

                      <div className="row bottom-portion-2">
                        <div className="col-lg-5 col-md-12 form-box py-2 px-4">

                          <div className="form-group w-100 row">
                            {/* <label className="col-sm-2 col-form-label mt-3">Twitter:</label> */}
                            {/* <div className="col-sm-10">
                            <input className="input-field mt-3" type="text" placeholder="@shylocknft" name="twitter" value={formData.twitter} onChange={handleFormData} />
                          </div> */}
                            {window.innerWidth < "700" ?
                              <>
                                <label className="col-sm-3 align-self-center col-form-label mt-3">Twitter :</label>
                                <div className="col-sm-9 align-self-center d-flex align-items-center mt-3">
                                  <input className="input-field mt-3" type="text" placeholder="@shylocknft" name="twitterUserName" value={formData.twitterUserName} onChange={handleFormData} />
                                  <a target="_blank" href="https://twitter.com/shylocknft/status/1608533440567332865?s=46&t=w0JnU_q69sjn_owgvhB_tg" rel="noreferrer">
                                  </a>
                                </div>
                              </>
                              :
                              ""}
                            <label className="col-sm-3 align-self-center col-form-label mt-3">Alias :</label>
                            <div className="col-sm-9 align-self-center d-flex align-items-center mt-3">
                              <input className="input-field mt-3" type="text" placeholder="Alias" name="alias" value={formData.alias} onChange={handleFormData} />
                              <a target="_blank" href="https://twitter.com/shylocknft/status/1608533440567332865?s=46&t=w0JnU_q69sjn_owgvhB_tg" rel="noreferrer">
                              </a>
                            </div>
                            <label className="col-sm-3 align-self-center col-form-label mt-3">Answer :</label>
                            <div className="col-sm-9 align-self-center d-flex align-items-center mt-3">
                              <input className="input-field mt-3" type="text" placeholder="Answer" name="answer" value={formData.answer} onChange={handleFormData} />
                              <a target="_blank" href="https://twitter.com/shylocknft/status/1608533440567332865?s=46&t=w0JnU_q69sjn_owgvhB_tg" rel="noreferrer">
                                <img className="info-button" src={InfoIcon} alt="info-button" />
                              </a>
                            </div>
                          </div>
                          <button className={`submit-btn d-flex ${shakeSubmit ? "animate__animated animate__shakeX" : ""}`} onClick={() => submitButton()}>
                            <span className="me-2">Submit</span>
                            <PulseLoader
                              color={"#ff8012"}
                              loading={loading}
                              cssOverride={{
                                display: "block",
                                margin: "0 auto",
                                borderColor: "#fff",
                              }}
                              size={10}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          </button>
                          <div className="orange-text align-self-center"> {isAllreadyRecordedData ? "<<Your Answer is already Recorded.>>" : ""}</div>
                        </div>

                        <div className="col-lg-7 col-md-12 rules-box">
                          <div className="rules-heading">{'<<PROTOCOLS>>'}</div>
                          <div className="rules">
                            <ul>
                              <li>Answers should be relevant to the lore and does not contain any NSFW words. (1x Entry)</li>
                              <li>Follow and Turn on notifications for both <a target="_blank" className="link" href="https://twitter.com/shylocknft" rel="noreferrer">@shylocknft</a> and <a target="_blank" className="link" href="https://twitter.com/imjasperai" rel="noreferrer">@imjasperai</a> to get regular updates and also to increase your chances of becoming an Agent. (2x Entry)</li>
                              <li>Share your mystery-solving experience in helping Shylock, your favorite character in the lore of Shylock Origins on your Twitter, and also tag your friends whom you think can become potential Agents. (3x Entry)</li>
                              {/* <li>Share your mystery-solving experience in helping Shylock on Twitter and also tag your friends who can be potential Agents. (3x Entry)</li> */}
                            </ul>
                           
                          </div>
                          <p className="attention-notes">⚠️ We have a Bot Prevention System (BPS) in place. Hence do not give multiple entries using different wallets and different Twitter accounts. Our system will detect and remove all entries specific to that IP.</p>
                              <p className="tac mb-0">{'<<T&C applied>>'}</p>
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
              {/* <div className={`metamask-box ${metaKey ? "border-green" : ""}`} onClick={handleConnectWallet}>
                {metaKey ? <img className="tick-icon" src={tickIcon} alt="" /> : ""}
                <img src={metamaskIcon} alt="" />
                {window.innerWidth <= "500" ?
                  <span className="meta-text">* Use Metamask Browser in Mobile</span>
                  : ""}
              </div> */}
              {window.innerWidth < "700" ?
                ""
                :
                <div className={`twitter-box ${user ? "border-green" : ""}`} onClick={!user ? handleTwitterLogin : handleTwitterLogout}>
                  {user ? <img className="tick-icon" src={tickIcon} alt="" /> : ""}
                  <span>Twitter</span>
                  <img className="ms-4 twitter-icon" src={twitterBlueIcon} alt="" />
                </div>
              }

            </div>
            <div className="d-flex justify-content-center align-items-center my-3">
              <button className={`enter-btn ${shake ? "animate__animated animate__shakeX" : ""}`} onClick={enterDarkRoom}> THE DARK ROOM </button>
            </div>
            {/* {metaKey && user ? "" : <p className="text-center">connections not verified</p>} */}
          </Modal>
          <Modal
            isOpen={isOpenSubmitPopup}
            toggle={() => setisOpenSubmitPopup(!isOpenSubmitPopup)}
            size="md"
            headTitle="SCAN FOR CONFIRMATION"
          >
            <div className="orange-text text-center mt-2">Your answer is recorded successfully.</div>
            <div className="orange-text text-center my-2"> Confirm your entry below</div>
            <div className="qr-code-container d-flex align-items-center justify-content-center">
              <img className="qr-code-image" src={QR_Code} alt="" />
            </div>
            <div className="d-flex justify-content-center align-items-center my-3">
              <button className="enter-btn me-2" onClick={handleQrDownload}> Download QR </button>
              <button className={`enter-btn`} onClick={() => setisOpenSubmitPopup(!isOpenSubmitPopup)}> Close </button>
            </div>
          </Modal>
        </div>

      </div>
    </>
  );
}

export default App;
