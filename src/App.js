/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import './App.scss';
// import Web3 from 'web3';
import logo from './shylock-logo.png';
import twitterIcon from './twitter.png';
import whiteLock from './Assets/white-lock.png';
// import metamaskIcon from './Assets/fox.png';
// import twitterBlueIcon from './Assets/twitter-blue.png';
// import QR_Code from './Assets/qr-code.jpeg';
import PuzzleImage from './Assets/puzzle-6-BW.png';
import tickIcon from './Assets/checked.png';
import InfoIcon from './Assets/information-button.png'
import ReactPlayer from 'react-player';
import axios from 'axios';
import Bgm from './Audio/shylock-bgm.mp3';
import JasperVoiceWave from './Audio/jasper-quest-end.mp4';
import question1 from './Audio/questions/question.mp4';
import Typewriter from 'typewriter-effect';
import 'animate.css';
import AnalogClock from 'analog-clock-react';
import Modal from "./components/common/Modal";
import PulseLoader from "react-spinners/PulseLoader";
// import { useNavigate } from "react-router-dom";
// firebase
import { signOut, getRedirectResult, signInWithRedirect, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { authentication } from './firebase-config';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Web3 from 'web3';
// import Timer from "./components/common/Timer";
// import { Tooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css';

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const WindowSize = "600";

function App() {
  // let navigate = useNavigate();
  const address = useAddress();
  const provider = new TwitterAuthProvider();

  // timer
  // const time = new Date();
  // time.setSeconds(time.getSeconds() + 60 * 120);

  let [loading, setLoading] = useState(false);
  const [isOpenLogin, setisOpenLogin] = useState(false);
  const [isOpenSubmitPopup, setisOpenSubmitPopup] = useState(false);
  const [isOpenDayPopup, setisOpenDayPopup] = useState(false);
  const [isAllreadyRecordedData, setIsAllreadyRecordedData] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
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
  const [timer, setTimer] = useState({
    hours: "",
    minutes: "",
    seconds: "",
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
    setTimeout(() => {
      setIsAllreadyRecordedData(false);
      setIsWrongAnswer(false);
    }, 3000);
  }, [isAllreadyRecordedData, isWrongAnswer])

  useEffect(() => {
    setTimerFunction();

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
    // console.log(etherBalance);
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

  // timer function
  const setTimerFunction = () => {
    // Set the date we're counting down to
    var countDownDate = new Date("Jan 16, 2023 23:59:59").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let tempHours = hours.toString().length === 1 ? "0" : "";
      let tempMinutes = minutes.toString().length === 1 ? "0" : "";
      let tempSeconds = seconds.toString().length === 1 ? "0" : "";

      // setTimer((prev) => {
      //   return { ...prev, "hours": hours, "minutes": minutes, "seconds": seconds }
      // });

      setTimer((prev) => {
        return { ...prev, "hours": tempHours + hours, "minutes": tempMinutes + minutes, "seconds": tempSeconds + seconds }
      });

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        setTimer((prev) => {
          return { ...prev, "hours": "00", "minutes": "00", "seconds": "00" }
        });
        // document.getElementById("timer-value").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  const daysData = [
    {
      id: 1,
      day: 1,
      isOpen: false,
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
    if (window.innerWidth < WindowSize) {
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
    setTimeout(() => {
      setportionCount(0);
    }, 500);
  }

  // const onDayClicked = () => {
  //   setportionCount(1);
  // }

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
      if (window.innerWidth < WindowSize) {
        if (formData.metamaskId === metamaskId || formData.twitterUserName === twitterUserName) {
          return metamaskId;
        }
      } else {
        // console.log(twitter.id);
        if (twitter === null) {
          if (formData.metamaskId === metamaskId) {
            return metamaskId;
          }
        } else if (formData.metamaskId === metamaskId || formData.twitter.uid === twitter.uid) {
          return metamaskId;
        }
      }
    });
    // console.log(isRecordedData);
    if (isRecordedData.length === 0) {
      if (window.innerWidth < WindowSize) {
        if (formData.answer.toLowerCase() === "boat" && formData.twitterUserName !== "" && formData.alias !== "") {
          setLoading(!loading);
          handleCreateRecord();
        }
        else if (formData.answer !== "" && formData.twitterUserName !== "" && formData.alias !== "") {
          setIsWrongAnswer(true);
        }
        else {
          setShakeSubmit(true);
          setTimeout(() => {
            setShakeSubmit(false);
          }, 500);
        }
      } else {
        if (formData.answer.toLowerCase() === "boat" && formData.alias !== "") {
          setLoading(!loading);
          handleCreateRecord();
        }
        else if (formData.answer !== "" && formData.alias !== "") {
          setIsWrongAnswer(true);
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

  const handlePuzzleDownload = () => {
    const a = document.createElement('a');
    a.href = PuzzleImage;
    a.download = 'Shylock’s Quest Day 6.jpg';
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
              {/* <div className="my-2" id="timer-value">
                          <span className="hour-box"></span><span className="timer-colen">:</span>
                          <span className="minute-box"></span><span className="timer-colen">:</span>
                          <span className="second-box"></span>
                        </div> */}

              {/* <div id="timer-value"></div> */}
              {/* <Timer expiryTimestamp={time} /> */}

            </div>
            <div className="logo-container cursor-pointer" onClick={() => setportionCount(-1)}>
              <img src={logo} className="shylock-logo" alt="logo" />
            </div>
            <div className={`metakey ${metaKey ? "border-orange" : ""}`}>
              {metaKey
                ? metaKey.slice(0, 5) + "..." + metaKey.slice(-5)
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

                      <div className="col-lg-6 days-box-container my-3">
                        <span className="days-heading">Quests</span>
                        <div style={{ height: "80%" }} className="d-flex align-items-center">
                          <div className="days-container">
                            {daysData.map(({ id, day, isOpen }) => {
                              return <div key={id} className={`days-box ${isOpen ? "unlocked-day" : "locked-day"}`} onClick={() => setisOpenDayPopup(!isOpenDayPopup)}>
                                {/* <Tooltip className="custom-tooltip" anchorId={`day-${day}`}  /> */}
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
                        {/* <div>
                          <div>QUEST LIVE:</div>
                          <div>9:00 AM - 11:00 AM EST</div>
                          <div>9:00 PM - 11:00 PM EST</div>
                        </div> */}
                      </div>
                    </div>
                  </>
                  : portionCount === 1 ?
                    <>
                      <div className="my-2 me-3" id="timer-value">
                        <span className="hour-box">{timer.hours}</span><span className="timer-colen">:</span>
                        <span className="minute-box">{timer.minutes}</span><span className="timer-colen">:</span>
                        <span className="second-box">{timer.seconds}</span>
                      </div>
                      {/* <div className="my-2" id="timer-value"></div> */}
                      <div className="upper-portion-2">
                        <div className="riddle-container">
                          <div className="riddle-heading">{'<<Quest: 6>>'}</div>
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

                          <div className="form-group row">
                            {/* <label className="col-sm-2 col-form-label mt-3">Twitter:</label> */}
                            {/* <div className="col-sm-10">
                            <input className="input-field mt-3" type="text" placeholder="@shylocknft" name="twitter" value={formData.twitter} onChange={handleFormData} />
                          </div> */}
                            {window.innerWidth < WindowSize ?
                              <>
                                <label className="col-sm-4 align-self-center col-form-label mt-3">Twitter :</label>
                                <div className="col-sm-8 align-self-center d-flex align-items-center mt-3">
                                  <input className="input-field" type="text" placeholder="@shylocknft" name="twitterUserName" value={formData.twitterUserName} onChange={handleFormData} />
                                  {/* <a target="_blank" href="https://twitter.com/shylocknft/status/1608533440567332865?s=46&t=w0JnU_q69sjn_owgvhB_tg" rel="noreferrer">
                                  </a> */}
                                </div>
                              </>
                              :
                              ""}
                            <label className="col-sm-4 align-self-center col-form-label mt-3">Your Detective Alias Name :</label>
                            <div className="col-sm-8 align-self-center d-flex align-items-center mt-3">
                              <input className="input-field" type="text" placeholder="Agent Shylock" name="alias" value={formData.alias} onChange={handleFormData} />
                              {/* <a target="_blank" href="https://twitter.com/shylocknft/status/1608533440567332865?s=46&t=w0JnU_q69sjn_owgvhB_tg" rel="noreferrer">
                              </a> */}
                            </div>
                            <label className="col-sm-4 align-self-center col-form-label mt-3">Answer :</label>
                            <div className="col-sm-8 align-self-center d-flex align-items-center mt-3">
                              <input className="input-field" type="text" placeholder="Answer" name="answer" value={formData.answer} onChange={handleFormData} />
                              <a target="_blank" href="https://twitter.com/shylocknft/status/1614681586393583617?s=20&t=uN062ZENBK_0Ry7gJeTTVg" rel="noreferrer">
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
                          <div className="orange-text align-self-center text-center fs-7"> {isAllreadyRecordedData ? "<<Your Answer is already Recorded.>>" : ""}{isWrongAnswer ? "<<Nice try, but that's not quite right. Look at the clue again.>>" : ""}
                          </div>
                        </div>

                        <div className="col-lg-7 col-md-12 rules-box">
                          <div className="rules-heading">{'<<PROTOCOLS>>'}</div>
                          <div className="rules">
                            <ul>
                              <li>Answers should be relevant to the lore and does not contain any NSFW words. (1x Entry)</li>
                              <li>Follow and Turn on notifications for both <a target="_blank" className="link" href="https://twitter.com/shylocknft" rel="noreferrer">@shylocknft</a> and <a target="_blank" className="link" href="https://twitter.com/imjasperai" rel="noreferrer">@imjasperai</a> to get regular updates and also to increase your chances of becoming an Agent. (2x Entry)</li>
                              <li>Share your mystery-solving experience by uploading the Evidence image and Tag 3 potential Agents on your Twitter with whom you can join together to solve the case with Shylock. (3x Entry)</li>
                            </ul>
                          </div>
                          <p className="attention-notes">⚠️ We have a Bot Prevention System (BPS) in place. Hence do not give multiple entries using different wallets and different Twitter accounts. Our system will detect and remove all entries specific to that IP.</p>
                          <p className="tac my-2">{'<<T&C applied>>'}</p>
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
            {/* {metaKey && user ? "" : <p className="text-center">connections not verified</p>} */}
          </Modal>
          <Modal
            isOpen={isOpenSubmitPopup}
            toggle={() => setisOpenSubmitPopup(!isOpenSubmitPopup)}
            size="md"
            headTitle="ENTRY STATUS"
          >
            <div className="orange-text text-center mt-2">Your answer is recorded successfully.</div>
            <div className="orange-text text-center my-2"> Confirm your entry below</div>
            <div className="qr-code-container d-flex align-items-center justify-content-center">
              <img className="qr-code-image" src={PuzzleImage} alt="" />
            </div>
            <div className="d-flex justify-content-center align-items-center my-3">
              <button className="enter-btn me-2" onClick={handlePuzzleDownload}> Download </button>
              {/* <button className="enter-btn me-2" onClick={() => navigate('/quest-lore')}> Reveal Evidence </button> */}
              {/* <button className={`enter-btn`} onClick={() => setisOpenSubmitPopup(!isOpenSubmitPopup)}> Close </button> */}
              <a target="_blank" href="https://twitter.com/intent/tweet?text=There%20you%20go%20%40shylocknft%2C%20guess%20who%20I've%20found%20in%20the%20final%20piece%20of%20the%20jigsaw%2C%20Cent%20(aka)%20Grim%20Reaper%2C%20who%20is%20the%20Head%20of%20the%20SERA%20Gang.%20He's%20one%20hell%20of%20a%20force%20to%20be%20reckoned%20with.%0a%0a%23SolvewithShylock" rel="noreferrer">
                <button className='enter-btn'>{`>> Tweet <<`}</button>
              </a>
            </div>
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
