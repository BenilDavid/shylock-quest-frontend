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
import { motion } from "framer-motion";
import imageWithKey from '../../Assets/chapterImages/chapterThreeOrig.png';
import imageWithoutKey from '../../Assets/chapterImages/chapterThreeWithoutKey.png';

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

const WindowSize = "1000";

const QuestionPage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  let [loading, setLoading] = useState(false);
  const [isOpenSubmitPopup, setisOpenSubmitPopup] = useState(false);
  const [isOpenImagePopup, setisOpenImagePopup] = useState(false);
  const [shakeSubmit, setShakeSubmit] = useState(false);
  const [allRecords, setallRecords] = useState([]);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isUserRecordCreated, setIsUserRecordCreated] = useState([]);

  const [formData, setFormData] = useState({
    twitter: location?.state?.twitterData,
    twitterUserName: "",
    metamaskId: location?.state?.metamaskId,
    answer: "",
    alias: "",
    walletAmount: location?.state?.walletAmount,
    currentChapterCount: params?.day,
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
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    console.log(e.currentTarget.value);
    setSelectedOption(e.target.value);
    setFormData((prev) => {
      return { ...prev, "answer": e.target.value }
    })
  }

  const answers = {
    'the-hideout': 'answerOne',
    'the-plan': 'answerTwo',
    'extraction': 'answerThree',
    'the-route': 'answerFour',
    'the-plot': 'answerFive',
    'execution': 'answerSix',
    'crash': 'answerSeven',
    '8': 'answerEight',
    '9': 'answerNine',
    '10': 'answerTen'
  }

  // correct answer
  const correctAnswers = {
    'the-hideout': 'jasper',
    'the-plan': 'left',
    'extraction': formData.answer.toLowerCase(),
    'the-route': 'sewer 2',
    'the-plot': 'helicopter',
    'execution': '300 miles',
    'crash': formData.answer.toLowerCase(),
    '8': '',
    '9': '',
    '10': '',
  }

  // intent tweet link
  const links = {
    'the-hideout': "https://twitter.com/intent/tweet?text=Completed%20my%20first%20mission%20teaming%20up%20with%20%40shylocknft.%20I%20cannot%20wait%20to%20see%20the%20downfall%20of%20the%20SERA%20Gang.%0a%0a%23SolvewithShylock.",
    'the-plan': "https://twitter.com/intent/tweet?text=Detective%20%40shylocknft%20is%20under%20immense%20pressure%20to%20rescue%20Ken%20from%20the%20hands%20of%20The%20SERA%20Gang%20All%20I'm%20going%20to%20do%20is%20support%20his%20plan%20and%20wait%20for%20my%20chance%20to%20help%20him%20out.%0a%0a%23SolvewithShylock",
    'extraction': 'https://twitter.com/intent/tweet?text=I%20have%20helped%20%40shylocknft%20find%20the%20missing%20clue.%20But%2C%20where%20does%20it%20lead%20to%3F%0a%0a%23SolvewithShylock',
    'the-route': 'https://twitter.com/intent/tweet?text=The%20route%20is%20paved%20for%20%40shylocknft%2C%20as%20the%20rescue%20mission%20is%20edging%20closer%20than%20ever.%0a%0a%23SolvewithShylock',
    'the-plot': 'https://twitter.com/intent/tweet?text=%40shylocknft%20is%20racing%20against%20time%2C%20as%20he%20takes%20the%20chopper%20to%20leave%20the%20hideout.%0a%0a%23SolvewithShylock',
    'execution': 'https://twitter.com/intent/tweet?text=Whatttt!!%20A%20missile%20is%20approaching%20%40shylocknft%20%E2%80%98s%20chopper.%20Looks%20like%20the%20SERA%20Gang%20sensed%20the%20danger%20and%20wants%20to%20silence%20him.%0a%0a%23SolvewithShylock',
    'crash': '',
    '8': '',
    '9': '',
    '10': '',

  }

  // info button link
  const infoLink = {
    'the-hideout': "https://twitter.com/imjasperai/status/1616888376455757830?s=46&t=rHKMIsuyfk8YlBr8uWJRvg",
    'the-plan': "https://twitter.com/shylocknft/status/1617593458553950209?s=46&t=w4EMvmzlrhmxODfDbuLtUw",
    'extraction': '',
    'the-route': 'https://twitter.com/shylocknft/status/1620469599270760452?s=46&t=vn6OZpIm4oLsGsEfDC7ZLg',
    'the-plot': 'https://twitter.com/shylocknft/status/1624472237884739585?s=46&t=2_oZeLntp5V34nmZNte-aQ',
    'execution': 'https://twitter.com/shylocknft/status/1625209887226748928?s=46&t=eU4cztvu2Vr__SlPp4NmWQ',
    'crash': '',
    '8': '',
    '9': '',
    '10': '',
  }
  useEffect(() => {
    getAllRecords();
    // setTimerFunction();
  }, [])

  useEffect(() => {
    // console.log(allRecords);
    checkUserExist();
  }, [allRecords])

  useEffect(() => {
    setTimeout(() => {
      // setIsAllreadyRecordedData(false);
      setIsWrongAnswer(false);
    }, 3000);
  }, [isWrongAnswer])

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
      if (params.day in answers) {
        await axios.post(`${URL}/api/submit-form`, { ...formData, [answers[params.day]]: formData.answer });
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
      if (params.day in answers) {
        await axios.patch(`${URL}/api/submit-form/updateRecord?id=${id}`, { [answers[params.day]]: formData.answer });
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
      if (params.day in correctAnswers) {
        if (formData.answer.toLowerCase() === correctAnswers[params.day] && formData.alias !== "" && formData.twitterUserName !== "") {
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
      if (params.day in correctAnswers) {
        if (formData.answer.toLowerCase() === correctAnswers[params.day] && formData.alias !== "") {
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

  const intentTweetButton = () => {
    if (params.day in links) {
      return <a target="_blank" href={links[params.day]} rel="noreferrer">
        <button className='enter-btn'>{`>> Tweet <<`}</button>
      </a>
    }
  }

  const infoButton = () => {
    if (params.day in infoLink) {
      if (params.day === 'extraction') {
        return <div onClick={() => setisOpenImagePopup(!isOpenImagePopup)}>
          <img className="info-button" src={InfoIcon} alt="info-button" />
        </div>
      } else {
        return <a target="_blank" href={infoLink[params.day]} rel="noreferrer">
          <img className="info-button" src={InfoIcon} alt="info-button" />
        </a>
      }
    }
  }

  return (
    <motion.div
      className="question-container"
      initial={{ opacity: 0, transition: { duration: 0.6 } }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="app-container">

        <div className="header d-flex">
          <div className="twitter-id back-btn ms-4">
            <div className="back-arrow d-flex align-items-center justify-content-center" onClick={() => navigate('/explore', { state: { metamaskId: location?.state?.metamaskId, twitterData: location?.state?.twitterData, walletAmount: location?.state?.walletAmount } })}>
              <span>{'<<'}</span>
            </div>
          </div>
          <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} className="shylock-logo" alt="logo" />
          </div>
          <div className={`metakey me-4 ${formData.metamaskId ? "border-orange" : ""}`}>
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
                  <div className="riddle-heading">{`<<${location?.state?.chapter}>>`}</div>
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

                  <div className="form-group mt-5 row">

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
                      {params.day === 'the-plan' ?
                        (<>
                          <label className={`radio-label ${selectedOption === "Left" ? "checked-radio" : ""}`}>
                            <input
                              type="radio"
                              name="door"
                              value="Left"
                              checked={selectedOption === "Left"}
                              onChange={handleOptionChange}
                            />
                            Left</label>
                          <label className={`radio-label ${selectedOption === "Right" ? "checked-radio" : ""}`}>
                            <input
                              type="radio"
                              name="door"
                              value="Right"
                              checked={selectedOption === "Right"}
                              onChange={handleOptionChange}
                            />
                            Right</label>
                        </>)
                        :
                        <input className="input-field" type="text" placeholder="Answer" name="answer" value={formData.answer} onChange={handleFormData} />
                      }
                      {infoButton()}
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
                  <div className="orange-text align-self-center text-center fs-7" style={{ height: "60px" }}>
                    {isWrongAnswer ? "<<Shylock is unable to rescue Ken from the hands of the SERA Gang. Thanks to your fat finger for moving slowly.>>" : ""}
                  </div>
                </div>

                <div className="col-lg-7 col-md-12 rules-box">
                  <div className="rules-heading">{'<<PROTOCOLS>>'}</div>
                  <div className="rules">
                    <ul>
                      <li>Answers should be relevant to the lore and does not contain any NSFW words. (1x Entry)</li>
                      <li>Follow and Turn on notifications for both <a target="_blank" className="link" href="https://twitter.com/shylocknft" rel="noreferrer">@shylocknft</a> and <a target="_blank" className="link" href="https://twitter.com/imjasperai" rel="noreferrer">@imjasperai</a> to get regular updates and also to increase your chances of becoming an Agent. (2x Entry)</li>
                      <li>Share your mystery-solving experience and Tag 3 potential Agents on your Twitter with whom you can join together to solve the case with Shylock. (3x Entry)</li>
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
          </div>
          <div className="d-flex justify-content-center align-items-center my-3">
            {intentTweetButton()}
          </div>
        </Modal>
        <Modal
          isOpen={isOpenImagePopup}
          toggle={() => setisOpenImagePopup(!isOpenImagePopup)}
          size="xl"
          headTitle=""
        >
          <div className="orange-text my-2 ms-1 fs-3">SPOT THE MISSSING CLUE</div>
          <div className="qr-code-container d-flex align-items-center justify-content-between">
            <img className="qr-code-image m-2" src={imageWithKey} alt="" />
            <img className="qr-code-image m-2" src={imageWithoutKey} alt="" />
          </div>
          <div className="d-flex justify-content-center align-items-center my-3">
            <button className="enter-btn" onClick={() => setisOpenImagePopup(!isOpenImagePopup)}>
              Close
            </button>
          </div>

        </Modal>
      </div>

    </motion.div>
  )
}

export default QuestionPage;
