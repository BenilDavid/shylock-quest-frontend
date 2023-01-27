/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import './ChapterPage.scss';
import logo from '../../shylock-logo.png';
import twitterIcon from '../../twitter.png';
import whiteLock from '../../Assets/white-lock.png';
import ReactPlayer from 'react-player';
import Bgm from '../../Audio/shylock-bgm.mp3';
import JasperVoiceWave from '../../Audio/audio wave_1.mp4';
import Typewriter from 'typewriter-effect';
import 'animate.css';
import { useNavigate, useLocation } from "react-router-dom";
// import axios from 'axios';
import { motion } from "framer-motion";
import lineArrow from "../../Assets/line-arrow.png";

export const URL = process.env.REACT_APP_SERVER_URL;
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const WindowSize = "1000";

function ChapterPage() {
    let navigate = useNavigate();
    //   const location = useLocation();
    const { state: { metamaskId, walletAmount, twitterData } } = useLocation();
    const [hideVideo, setHideVideo] = useState(false);
    const [shakeLock, setShakeLock] = useState(false);
    // const [allRecords, setallRecords] = useState([]);
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
        // update clock
        setInterval(() => {
            updateClock();
        }, 1000);
    }, [])

    // useEffect(() => {
    //     getAllRecords();
    // }, [])

    // getAllRecords
    // const getAllRecords = async () => {
    //     try {
    //         const { data } = await axios.get(`${URL}/api/submit-form/getRecords`);
    //         setallRecords(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
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
            day: "THE HIDEOUT",
            isOpen: true,
        },
        {
            id: 4,
            day: "LOCKER",
            isOpen: false,
        },
        {
            id: 5,
            day: "HELIPAD",
            isOpen: false,
        },
        {
            id: 8,
            day: "MEETAGENTS",
            isOpen: false,
        },
        {
            id: 9,
            day: "BIKE",
            isOpen: false,
        },
        {
            id: 2,
            day: "THE PLAN",
            isOpen: true,
        },
        {
            id: 3,
            day: "EXTRACTION",
            isOpen: true,
        },
        {
            id: 6,
            day: "TUNNEL",
            isOpen: false,
        },
        {
            id: 7,
            day: "LIBRARY",
            isOpen: false,
        },
        {
            id: 10,
            day: "PRISON",
            isOpen: false,
        },
    ]

    const jasperVideoEnded = () => {
        setHideVideo(true);
    }
    const handleShakeLock = () => {
        setShakeLock(true);
        setTimeout(() => {
            setShakeLock(false);
        }, 500);
    }

    return (
        <>
            <motion.div className="chapter-container"
                initial={{ opacity: 0 , transition: {duration: 0.8} }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 , transition: {duration: 0.8} }}
            >
                <div className="app-container">
                    <div className="header d-flex">
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

                    {window.innerWidth > WindowSize ?
                        <>
                            <ReactPlayer className="d-none" url={Bgm} playing={true} controls={false} volume={1} muted={false} loop={true} />

                            <div className="internal-content">

                                <div className="upper-portion-1">
                                    <div className={`video-container ${hideVideo ? "d-none" : ""}`}>
                                        <ReactPlayer className={`jasper-video`} url={JasperVoiceWave} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true} onEnded={jasperVideoEnded} />
                                    </div>

                                    <Typewriter
                                        onInit={(typewriter) => {
                                            typewriter
                                                // .pauseFor(400)
                                                .typeString(" Welcome Agents and Recruits, Shylock is thrilled to invite you to take part in this roller coaster adventure of unravelling the lore, and witnessing his attempt at rescuing Ken from the SERA Gang.")
                                                // .pauseFor(1000)
                                                .typeString(" Rules are pretty simple, look out for the clues and complete the mission. Each mission you complete will bring you closer to the most coveted role “AGENT” and also extra rewards. ")
                                                .typeString(" We monitor your progress via the tracker, the higher the meter, better the shot at getting recruited. Good luck on your journey.")
                                                .start();
                                        }}
                                        options={{
                                            loop: false,
                                            delay: 40,
                                            pauseFor: 100000,
                                        }}
                                    />
                                </div>
                                <div className="bottom-portion-1">
                                    <div className="days-box-container my-3">
                                        <span className="days-heading">MISSIONS</span>
                                        <div style={{ height: "80%" }} className="d-flex align-items-center">
                                            <div className="days-container">
                                                {daysData.map(({ id, day, isOpen }) => {
                                                    return <>
                                                        <div key={id} className={`days-box ${isOpen ? "unlocked-day" : "locked-day"}`} onClick={isOpen ? () => navigate(`/chapter/${id}`, { state: { metamaskId: metamaskId, twitterData: twitterData, walletAmount: walletAmount, chapter: day } }) : () => handleShakeLock(id)}>
                                                            {!isOpen ?
                                                                <img key={id} className={`locked-image-${id} ${shakeLock ? "animate__animated animate__headShake" : ""}`} src={whiteLock} alt="" />
                                                                : ""}
                                                            <span>{isOpen ? day : ""}</span>
                                                            {isOpen ?
                                                            <img className={`line-arrow-${id}`} src={lineArrow} alt="" />
                                                                // <div className={`line-arrow-${id}`}></div>
                                                                : ""}
                                                        </div>
                                                        
                                                    </>
                                                })}
                                            </div>
                                        </div>
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
                </div>

            </motion.div>
        </>
    );
}

export default ChapterPage;
