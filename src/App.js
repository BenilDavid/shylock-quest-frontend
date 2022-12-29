/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import logo from './Assets/Shylock-Festive-Season.png';
import './App.scss';
import twitterIcon from './twitter.png';
import whiteLock from './Assets/white-lock.png';
import metamaskIcon from './Assets/fox.png';
import twitterBlueIcon from './Assets/twitter-blue.png';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Bgm from './Audio/shylock-bgm.mp3';
import JasperVoiceWave from './Audio/jasper-wave.webm';
import question1 from './Audio/questions/question_1.webm';
import Typewriter from 'typewriter-effect';
import 'animate.css';
import AnalogClock from 'analog-clock-react';
import Modal from "./components/common/Modal";
import auth0 from 'auth0-js';
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie, deleteCookie } from "./Utils/common";

// import 
export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

function App() {
  let navigate = useNavigate();

  const auth = new auth0.WebAuth({
    domain: 'dev-84b3eyvpgznxxa6w.us.auth0.com',
    clientID: 'mGyVTxXg02pGfgHHT79MW4zTi9b53W5F',
    redirectUri: CLIENT_URL,
    responseType: 'token id_token',
    // scope: 'openid profile email',
    audience: 'https://dev-84b3eyvpgznxxa6w.us.auth0.com/userinfo'
  });

  // const client = new auth0.Management({
  //   domain: 'dev-84b3eyvpgznxxa6w.us.auth0.com',
  //   token: '63860b71e670b24d9067ec59'
  // });

  const [isOpenLogin, setisOpenLogin] = useState(false);
  const [isOpenSubmitPopup, setisOpenSubmitPopup] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  // const [typingAudio, setTypingAudio] = useState(false);
  // const [bgmAudio, setBgmAudio] = useState(false);
  const [portionCount, setportionCount] = useState(-1);
  const [user, setUser] = useState(getCookie("twitterDetails"));
  const [metaKey, setMetaKey] = useState(getCookie("metamaskId"));
  const [shake, setShake] = useState(false);
  const [formData, setFormData] = useState({
    metamaskId: metaKey,
    twitter: user,
    answer: ""
  });
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
  // const twitterDetails = JSON.parse(getCookie("twitterDetails"));

  useEffect(() => {
    console.log(user);
    console.log(metaKey);
    auth.parseHash((err, authResult) => {
      console.log("auth result", authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        // Login successful: retrieve user information
        const user = authResult.idTokenPayload;
        window.location.replace(CLIENT_URL);
        console.log(user);
        setUser(user);
        setCookie("twitterDetails", JSON.stringify(user), 1);
      } else if (err) {
        // Login failed: handle error
        console.error(err);
      }
    });

    // update clock
    setInterval(() => {
      updateClock();
    }, 1000);
  }, [])

  useEffect(() => {
    console.log(portionCount);
  }, [portionCount])

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
    },
    {
      id: 7,
      day: 7,
      isOpen: false,
    },
    {
      id: 8,
      day: 8,
      isOpen: false,
    },
    {
      id: 9,
      day: 9,
      isOpen: false,
    },
    {
      id: 10,
      day: 10,
      isOpen: false,
    },
  ]

  const handleTwitterLogin = () => {
    auth.authorize({
      connection: 'twitter'
    });

    // client.patch({
    //   url: '/organizations/org_8OZayO6vB1h5wk8V',
    //   body: {
    //     name: 'shylock'
    //   }
    // }, (err, data) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log(data);
    //   }
    // });
  }

  const handleTwitterLogout = () => {
    auth.logout({
      client_id: 'mGyVTxXg02pGfgHHT79MW4zTi9b53W5F',
      returnTo: CLIENT_URL
    });
    setUser(null);
    deleteCookie("twitterDetails");
  }

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setMetaKey(accounts[0]);
      setCookie("metamaskId", accounts[0], 1);

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

  const submitButton = async () => {
    console.log(formData);
    try {
      await axios.post(`${URL}/api/submit-form`, formData);
      setFormData({ ...formData, answer: "" });
      setisOpenSubmitPopup(!isOpenSubmitPopup);
    } catch (error) {
      console.log(error);
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
    <div className="App">
      {/* <BrowserRouter>
          <Routes>
            <Route exact path="/quest-puzzle" element={<QuestImagePage />} />
          </Routes>
        </BrowserRouter> */}
      <div className="app-container">

        <div className="header d-flex">
          <div className="twitter-id back-btn ms-3">
            {portionCount === 1 ? <div className="back-arrow d-flex align-items-center justify-content-center" onClick={() => setportionCount(0)}>
            <span>{'<<'}</span>
            </div> : ""}
          </div>
          <div className="logo-container">
            <img src={logo} className="shylock-logo" alt="logo" onClick={() => {setportionCount(-1)}}/>
          </div>
          <div className="metakey me-4">
            {metaKey
              ? metaKey.slice(0, 5) + "..." + metaKey.slice(-5)
              : ""}
          </div>
        </div>

        {/* 
        <TwitterLogin
          loginUrl="http://localhost:3000/api/v1/auth/twitter"
          onFailure={onFailed}
          onSuccess={onSuccess}
          requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse"
          showIcon={true}
        // customHeaders={customHeader}
        >
          Twitter Login
        </TwitterLogin> */}

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
                          .typeString('Welcome everyone, I will be here with you clarifying the details of Shylock’s Festive season Challenge. Shylock decides to conduct tasks and missions for you and your friends to solve together.')
                          .pauseFor(400)
                          .typeString(' At the end of Shylock’s Festive Season Challenge, you and your friends will be rewarded with exciting gifts and present from Detective Shylock.')
                          .pauseFor(400)
                          .typeString(' Every participant is considered and rewarded deservingly.')
                          .pauseFor(800)
                          .typeString(' When in doubt look out for The Shades.')
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
                    <div className="col-lg-2 analog-clock my-3">
                      <AnalogClock {...analogClockTime} />
                    </div>

                    <div className="col-lg-8 days-box-container my-3">
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

                    <div className="col-lg-2 time-box-container my-3">
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
                          <div className="col-sm-8">
                            <input className="input-field mt-3" type="text" placeholder="Answer" name="answer" value={formData.answer} onChange={handleFormData} />
                          </div>
                        </div>
                        <button className="submit-btn" onClick={() => submitButton()}>Submit</button>
                      </div>

                      <div className="col-lg-7 col-md-12 rules-box">
                        <div className="rules-heading">{'<<Rules>>'}</div>
                        <div className="rules">
                          <ul>
                            <li>Participants must provide their accurate Twitter username when participating in the quest. </li>
                            <li> Follow and Turn on notifications for both the <a className="link" href="https://twitter.com/shylocknft">@shylocknft</a> and <a className="link" href="https://twitter.com/shylockagents">@shylockagents</a>.</li>
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
          <img src={metamaskIcon} alt="" />

          </div>
          <div className={`twitter-box ${user ? "border-green" : ""}`} onClick={!user ? handleTwitterLogin : handleTwitterLogout}>
          <img src={twitterBlueIcon} alt="" />
            {/* Twitter */}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center my-3">
          <button className={`enter-btn ${shake ? "animate__animated animate__shakeX" : ""}`} onClick={metaKey && user ? Initiation : () => {
            setShake(true); setTimeout(() => {
              setShake(false);
            }, 500);
          }}> ENTER THE SHADES </button>
        </div>
        {/* {metaKey && user ? "" : <p className="text-center">connections not verified</p>} */}
      </Modal>
      <Modal
        isOpen={isOpenSubmitPopup}
        toggle={() => setisOpenSubmitPopup(!isOpenSubmitPopup)}
        size="md"
        headTitle="SUBMIT"
      >
       <div>Collect your puzzle here</div>
        <div className="d-flex justify-content-center align-items-center my-3">
          <button className={`enter-btn ${shake ? "animate__animated animate__shakeX" : ""}`} onClick={() => navigate("/quest-puzzle")}> Close </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
