/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import './QuestionPage.scss';
import logo from '../../shylock-logo.png';
import twitterIcon from '../../twitter.png';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Bgm from '../../Audio/shylock-bgm.mp3';
import question1 from '../../Audio/questions/question_look.mp4';
import Typewriter from 'typewriter-effect';
import 'animate.css';
import Modal from "../common/Modal";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import InfoIcon from '../../Assets/information-button.png'

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

const WindowSize = "1000";

const QuestionPage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  let [loading, setLoading] = useState(false);
  const [isOpenSubmitPopup, setisOpenSubmitPopup] = useState(false);
  const [shakeSubmit, setShakeSubmit] = useState(false);
  const [allRecords, setallRecords] = useState([]);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  // const [isAllreadyRecordedData, setIsAllreadyRecordedData] = useState(false);
  const [isUserRecordCreated, setIsUserRecordCreated] = useState([]);
  // const [timer, setTimer] = useState({
  //   hours: "",
  //   minutes: "",
  //   seconds: "",
  // });
  const [formData, setFormData] = useState({
    twitter: location?.state?.twitterData,
    twitterUserName: "",
    metamaskId: location?.state?.metamaskId,
    answer: "",
    alias: "",
    walletAmount: location?.state?.walletAmount,
    currentChapterCount: params?.id,
    answerOne: "",
    answerTwo: "",
    answerThree: "",
    answerFour: "",
    answerFive: "",
    answerSix: "",
    answerSeven: "",
    answerEight: "",
    answerNine: "",
    answerTen: ""
  });

  const answers = {
    '1': 'answerOne',
    '2': 'answerTwo',
    '3': 'answerThree',
    '4': 'answerFour',
    '5': 'answerFive',
    '6': 'answerSix',
    '7': 'answerSeven',
    '8': 'answerEight',
    '9': 'answerNine',
    '10': 'answerTen'
  }
  const correctAnswers = {
    '1': 'jasper',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '10': 'ten',
  }
  useEffect(() => {
    getAllRecords();
    // setTimerFunction();
  }, [])

  useEffect(() => {
    console.log(allRecords);
    checkUserExist();
  }, [allRecords])

  useEffect(() => {
    setTimeout(() => {
      // setIsAllreadyRecordedData(false);
      setIsWrongAnswer(false);
    }, 3000);
  }, [ isWrongAnswer])

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
      if (params.id in answers) {
        await axios.post(`${URL}/api/submit-form`, { ...formData, [answers[params.id]]: formData.answer });
      } else {
        console.log("Invalid id")
      }
      setFormData({ ...formData, answer: "", twitterUserName: "" });
      setisOpenSubmitPopup(!isOpenSubmitPopup);
      setLoading(false);
      getAllRecords();
    } catch (error) {
      console.log(error);
    }
  }

  // updateRecord
  const handleUpdateRecord = async (id) => {
    try {
      if (params.id in answers) {
        await axios.patch(`${URL}/api/submit-form/updateRecord?id=${id}`, { [answers[params.id]]: formData.answer });
      } else {
        console.log("Invalid id")
      }
      setFormData({ ...formData, answer: "" });
      setisOpenSubmitPopup(!isOpenSubmitPopup);
      setLoading(false);
      getAllRecords();
    } catch (error) {
      console.log(error);
    }
  }

  // timer function
  // const setTimerFunction = () => {
  //   var countDownDate = new Date("Jan 30, 2023 23:59:59").getTime();

  //   var x = setInterval(function () {
  //     var now = new Date().getTime();
  //     var distance = countDownDate - now;

  //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     let tempHours = hours.toString().length === 1 ? "0" : "";
  //     let tempMinutes = minutes.toString().length === 1 ? "0" : "";
  //     let tempSeconds = seconds.toString().length === 1 ? "0" : "";

  //     setTimer((prev) => {
  //       return { ...prev, "hours": tempHours + hours, "minutes": tempMinutes + minutes, "seconds": tempSeconds + seconds }
  //     });

  //     if (distance < 0) {
  //       clearInterval(x);
  //       setTimer((prev) => {
  //         return { ...prev, "hours": "00", "minutes": "00", "seconds": "00" }
  //       });
  //     }
  //   }, 1000);
  // }

  const handleFormData = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
  }

  const checkUserExist = () => {
    // console.log(allRecords);
    const isUserRecordCreated = allRecords.filter(({ metamaskId, twitter }) => {
      if (twitter === null) {
        if (formData.metamaskId === metamaskId) {
          return metamaskId;
        }
      } else if (formData.metamaskId === metamaskId || formData.twitter[0].uid === twitter[0].uid) {
        return metamaskId;
      }
    });
    // console.log("user exist", isUserRecordCreated);
    setIsUserRecordCreated(isUserRecordCreated);
    if (isUserRecordCreated.length !== 0) {
      setFormData((prev) => {
        return { ...prev, "alias": isUserRecordCreated[0].alias, "twitterUserName": isUserRecordCreated[0].twitterUserName }
      })
    }
  }

  const submitButton = () => {
    // eslint-disable-next-line array-callback-return

    if (isUserRecordCreated.length === 0) {
      if (params.id in correctAnswers) {
        if (formData.answer.toLowerCase() === correctAnswers[params.id] && formData.alias !== "" && formData.twitterUserName !== "") {
          setLoading(!loading);
          handleCreateRecord();
        }
        else if (formData.answer !== "" && formData.alias !== "" && formData.twitterUserName !== "") {
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
      if (params.id in correctAnswers) {
        if (formData.answer.toLowerCase() === correctAnswers[params.id] && formData.alias !== "") {
          setLoading(!loading);
          handleUpdateRecord(isUserRecordCreated[0]._id);
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
    }
  }

  return (
    <div className="question-container">
      <div className="app-container">

        <div className="header d-flex">
          <div className="twitter-id back-btn ms-3">
            <div className="back-arrow d-flex align-items-center justify-content-center" onClick={() => navigate('/chapter', { state: { metamaskId: location?.state?.metamaskId, twitterData: location?.state?.twitterData, walletAmount: location?.state?.walletAmount } })}>
              <span>{'<<'}</span>
            </div>
          </div>
          <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} className="shylock-logo" alt="logo" />
          </div>
          <div className={`metakey me-2 ${formData.metamaskId ? "border-orange" : ""}`}>
            {formData.metamaskId
              ? formData.metamaskId.slice(0, 5) + "..." + formData.metamaskId.slice(-5)
              : ""}
          </div>
        </div>
        {window.innerWidth > WindowSize ?
          <>
            <ReactPlayer className="d-none" url={Bgm} playing={true} controls={false} volume={1} muted={false} loop={true} />

            <div className="internal-content">

              {/* <div className="my-2 me-3" id="timer-value">
                <span className="hour-box">{timer.hours}</span><span className="timer-colen">:</span>
                <span className="minute-box">{timer.minutes}</span><span className="timer-colen">:</span>
                <span className="second-box">{timer.seconds}</span>
              </div> */}
              {/* <div className="my-2" id="timer-value"></div> */}
              <div className="upper-portion-2">
                <div className="riddle-container">
                  <div className="riddle-heading">{`<<Quest: ${params?.id}>>`}</div>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Look out for the clues and complete the mission.")
                        .start();
                    }}
                    options={{
                      loop: false,
                      delay: 40,
                      pauseFor: 100000,
                    }}
                  />
                  <ReactPlayer className={`jasper-video`} url={question1} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true}
                  // onEnded={jasperVideoEnded} 
                  />
                </div>
              </div>

              <div className="row bottom-portion-2">
                <div className="col-lg-5 col-md-12 form-box py-2 px-4">

                  <div className="form-group row">
                  
                    <label className="col-sm-4 align-self-center col-form-label mt-3">Twitter :</label>
                    <div className="col-sm-8 align-self-center d-flex align-items-center mt-3">
                      {isUserRecordCreated.length !== 0 && formData.twitterUserName !== "" ?
                        <span className="text-center fs-6">{formData.twitterUserName}</span>
                        :
                        <input className="input-field" type="text" placeholder="@shylocknft" name="twitterUserName" value={formData.twitterUserName} onChange={handleFormData} />
                      }
                    </div>
              
                    <label className="col-sm-4 align-self-center col-form-label mt-3">Your Detective Alias Name :</label>
                    <div className="col-sm-8 align-self-center d-flex align-items-center mt-3">
                      {isUserRecordCreated.length !== 0 && formData.alias !== "" ?
                        <span className="text-center fs-6">{formData.alias}</span>
                        :
                        <input className="input-field" type="text" placeholder="Agent Shylock" name="alias" value={formData.alias} onChange={handleFormData} />
                      }
                    </div>
                    <label className="col-sm-4 align-self-center col-form-label mt-3">Answer :</label>
                    <div className="col-sm-8 align-self-center d-flex align-items-center mt-3">
                      <input className="input-field" type="text" placeholder="Answer" name="answer" value={formData.answer} onChange={handleFormData} />
                      <a target="_blank" href="https://twitter.com/shylocknft/status/1614681586393583617?s=20&t=uN062ZENBK_0Ry7gJeTTVg" rel="noreferrer">
                                <img className="info-button" src={InfoIcon} alt="info-button" />
                              </a>
                    </div>
                  </div>
                  <button className={`my-4 submit-btn d-flex ${shakeSubmit ? "animate__animated animate__shakeX" : ""}`} onClick={() => submitButton()}>
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
                  <div className="orange-text align-self-center text-center fs-7" style={{height: "60px"}}>
                    {isWrongAnswer ? "<<Shylock is unable to rescue Ken from the hands of the SERA Gang. Thanks to your fat finger for moving slowly.>>" : ""}
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
                    <p className="attention-notes">⚠️ We have a Bot Prevention System (BPS) in place. Hence do not give multiple entries using different wallets and different Twitter accounts. Our system will detect and remove all entries specific to that IP.</p>
                  </div>
                
                  <p className="tac my-2">{'<<T&C applied>>'}</p>
                </div>
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
          isOpen={isOpenSubmitPopup}
          toggle={() => setisOpenSubmitPopup(!isOpenSubmitPopup)}
          size="md"
          headTitle="ENTRY STATUS"
        >
          <div className="orange-text text-center mt-2">Your answer is recorded successfully.</div>
          <div className="orange-text text-center my-2"> Confirm your entry below</div>
          <div className="qr-code-container d-flex align-items-center justify-content-center">
            {/* <img className="qr-code-image" src={PuzzleImage} alt="" /> */}
          </div>
          <div className="d-flex justify-content-center align-items-center my-3">
            {/* <button className="enter-btn me-2" onClick={handlePuzzleDownload}> Download </button> */}
            {/* <button className="enter-btn me-2" onClick={() => navigate('/quest-lore')}> Reveal Evidence </button> */}
            {/* <button className={`enter-btn`} onClick={() => setisOpenSubmitPopup(!isOpenSubmitPopup)}> Close </button> */}
            <a target="_blank" href="https://twitter.com/intent/tweet?text=Completed%20my%20first%20mission%20teaming%20up%20with%20%40shylocknft.%20I%20cannot%20wait%20to%20see%20the%20downfall%20of%20the%20SERA%20Gang.%20What%20about%20you%3F%0a%0a%23SolvewithShylock." rel="noreferrer">
              <button className='enter-btn'>{`>> Tweet <<`}</button>
            </a>
          </div>
        </Modal>
      </div>

    </div>
  )
}

export default QuestionPage;