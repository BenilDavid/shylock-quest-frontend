/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import './App.scss';
import logo from './shylock-logo.png';
import twitterIcon from './twitter.png';
import whiteLock from './Assets/white-lock.png';
import metamaskIcon from './Assets/fox.png';
import twitterBlueIcon from './Assets/twitter-blue.png';
import QR_Code from './Assets/qr-code-orange.jpeg';
import tickIcon from './Assets/checked.png';
import InfoIcon from './Assets/information-button.png'
import ReactPlayer from 'react-player';
import axios from 'axios';
import Bgm from './Audio/shylock-bgm.mp3';
import JasperVoiceWave from './Audio/audio_wave.webm';
import question1 from './Audio/questions/question_1.webm';
import Typewriter from 'typewriter-effect';
import 'animate.css';
import AnalogClock from 'analog-clock-react';
import Modal from "./components/common/Modal";
import PulseLoader from "react-spinners/PulseLoader";
// import { useNavigate } from "react-router-dom";
// import { setCookie, getCookie, deleteCookie } from "./Utils/common";
// firebase
import { signOut, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { authentication } from './firebase-config';

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

function App() {
  // let navigate = useNavigate();

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
    metamaskId: "",
    answer: ""
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

  // const override: CSSProperties = {
  //   display: "block",
  //   margin: "0 auto",
  //   borderColor: "red",
  // };

  // const twitterDetails = JSON.parse(getCookie("twitterDetails"));

  useEffect(() => {
    getAllRecords();
    // update clock
    setInterval(() => {
      updateClock();
    }, 1000);
  }, [])

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, "metamaskId": metaKey, "twitter": user }
    })
    // console.log(portionCount);
  }, [metaKey, user])

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
    signInWithPopup(authentication, provider)
      .then((result) => {
        const user = result.user;
        console.log(result);
        setUser(user);
        // setCookie("twitterDetails", JSON.stringify(user), 1);
      }).catch((error) => {
        console.log(error);
      });
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

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setMetaKey(accounts[0]);
      // setCookie("metamaskId", accounts[0], 1);

    } else {
      console.log("install meta mask");
    }
  };

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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // createRecord
  const handleCreateRecord = async () => {
    try {
      await axios.post(`${URL}/api/submit-form`, formData);
      setFormData({ ...formData, answer: "" });
      setisOpenSubmitPopup(!isOpenSubmitPopup);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const submitButton = () => {

    // eslint-disable-next-line array-callback-return
    const isRecordedData = allRecords.map(({ metamaskId, twitter: { uid } }) => {
      if (formData.metamaskId === metamaskId && formData.twitter.uid === uid) {
        return formData;
      }
    });

    // console.log(isRecordedData);
    if(isRecordedData.length === 0){
      if (formData.answer !== "") {
        // console.log("new answer");
  
        setLoading(!loading);
        handleCreateRecord();
      } else {
        setShakeSubmit(true);
        setTimeout(() => {
          setShakeSubmit(false);
        }, 500);
      }
    }else{
      setIsAllreadyRecordedData(true);
      // alert("your answer is already recorded");
    }
    
  }

  // const EndOfVoice = () => {
  //   setportionCount(2);
  // }

  const jasperVideoEnded = () => {
    setHideVideo(true);
  }

  // const BgmReady = () => {
  //   setBgmAudio(true);
  // }

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
            <div className={`metakey me-3 ${metaKey ? "border-orange" : ""}`}>
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
                            .typeString("Welcome to the Mind of Shylock. His mind is an enigma that is always crammed with thoughts about clues and suspects in his ongoing investigation. Never comes a moment in his life where he lets his mind remain untamed. Despite his intelligence and determination, he is also prone to moments of doubts and insecurity which brings us to you.")
                            .pauseFor(500)
                            .typeString(' To become an Agent, you must be able to unravel the mysteries with Shylock and help him find ways to solve the investigation.')
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

                      <div className="col-lg-3 time-box-container my-3">
                        <div>
                          <p>Starting Time: 10:30 AM (EST)</p>
                          <p> Quest Live for 24 hours</p>
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
                                .typeString("I'm a vital part of Shylock's work, a tool that helps piece together the facts. I'm a shade that's always there, a cool and calm presence in the heat of the case. I guide him down the right path, leading to the truth. What am I?")
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

                            <label className="col-sm-4 col-form-label mt-3">Answer :</label>
                            <div className="col-sm-8 d-flex align-items-center">
                              <input className="input-field mt-3" type="text" placeholder="Answer" name="answer" value={formData.answer} onChange={handleFormData} />
                              <img className="info-button" src={InfoIcon} alt="info-button" />
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
                          <div className="rules-heading">{'<<Rules>>'}</div>
                          <div className="rules">
                            <ul>
                              <li>Participants must provide their accurate Twitter username when participating in the quest. </li>
                              <li> Follow and Turn on notifications for both the <a target="_blank" className="link" href="https://twitter.com/shylocknft" rel="noreferrer">@shylocknft</a> and <a target="_blank" className="link" href="https://twitter.com/imjasperai" rel="noreferrer">@imjasperai</a>.</li>
                              <li>Tag atleast 3 potential agents (friends) in their respective tweet after completing the quest.</li>
                              <li>Answers should not contain any NSFW (not safe for work) words.</li>
                              <p>⚠️ Failure to follow any of the above rules will result in disqualification from the quest.</p>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                    : ""}
              </div>
            </>
            : ""}

          <div className='footer'>
            <button className="twitter-btn">
              <a href="https://twitter.com/shylocknft">
                <img src={twitterIcon} className="twitter-logo" alt="twitter" />
              </a>
            </button>
          </div>
        </div>

        <Modal
          isOpen={isOpenLogin}
          toggle={() => setisOpenLogin(!isOpenLogin)}
          size="md"
          headTitle="LOGIN"
        >
          <div className="login-box">
            <div className={`metamask-box ${metaKey ? "border-green" : ""}`} onClick={handleConnectWallet}>
              {/* Metamask */}
              {metaKey ? <img className="tick-icon" src={tickIcon} alt="" /> : ""}
              <img src={metamaskIcon} alt="" />

            </div>
            <div className={`twitter-box ${user ? "border-green" : ""}`} onClick={!user ? handleTwitterLogin : handleTwitterLogout}>
              {user ? <img className="tick-icon" src={tickIcon} alt="" /> : ""}
              <img src={twitterBlueIcon} alt="" />
              {/* Twitter */}
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center my-3">
            <button className={`enter-btn ${shake ? "animate__animated animate__shakeX" : ""}`} onClick={metaKey && user ? Initiation : () => {
              setShake(true); setTimeout(() => {
                setShake(false);
              }, 500);

            }}> THE MIND </button>
          </div>
          {/* {metaKey && user ? "" : <p className="text-center">connections not verified</p>} */}
        </Modal>
        <Modal
          isOpen={isOpenSubmitPopup}
          toggle={() => setisOpenSubmitPopup(!isOpenSubmitPopup)}
          size="md"
          headTitle="SUBMIT"
        >
          <div className="orange-text text-center mt-2">Your answer is recorded successfully.</div>
          <div className="orange-text text-center my-2"> Confirm your entry below</div>
          <div className="qr-code-container d-flex align-items-center justify-content-center">
            <img className="qr-code-image" src={QR_Code} alt="" />
          </div>
          <div className="d-flex justify-content-center align-items-center my-3">
            <button className={`enter-btn`} onClick={() => setisOpenSubmitPopup(!isOpenSubmitPopup)}> Close </button>
          </div>
        </Modal> 
      </div>
    </>
  );
}

export default App;
