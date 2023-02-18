import React, { useState } from "react";
import logo from '../../shylock-logo.png';
import twitterIcon from '../../twitter.png';
import Bgm from '../../Audio/shylock-bgm.mp3';
import ReactPlayer from 'react-player';
import Typewriter from 'typewriter-effect';
import WCJasperWave from '../../Video/wallet-checker-jasper.mp4';
import WLVideo from '../../Video/rolling.mp4';
import notWLVideo from '../../Video/notWhitelisted.mp4';
import 'animate.css';
import { useNavigate, useLocation } from "react-router-dom";
// import axios from 'axios';
import { motion } from "framer-motion";
import './WalletCheckerPage.scss';

const WalletCheckerPage = () => {
    let navigate = useNavigate();
    const { state: { metamaskId } } = useLocation();

    const [isWhiteListUser, setIsWhiteListUser] = useState("");
    //   const [isOpenWalletChecker, setisOpenWalletChecker] = useState(false);
    const [addressChecker, setAddressChecker] = useState("");

    // All Whitelisted Address
    let whitelist = [
        '0x624deBbC5c3Ff951b257cB4E06975Aa82a36E642', // metamask id ben
        '0xCEa3506e61c9F3f839eB881E4E1e5ebfA19B13F1', // metamask id ben
        '0xf3f91d957D142703cc26E3C6a70df14036906F27', // metamask id ben
        '0xf6D14956e5c77390C8367CCDbcb5b845244365dE',
        '0x4f6Cb155B513c6b917Beab345a01be235a2DB28E',
        '0xE4C70800F7fBf773A5E18BC96b0eF4135f63f63E',
        '0x97557dB165c299663Ef134F18E1Fb3F093a1F15e',
        '0x670f8FE66F551cdeDa29eAF0Bf380A412e404127',
        '0xb9395AfB1a1a42050fa11562C4c9cA35D1Ec7cF3',
        '0xB282100108E572c21A199ec9B0B4E9cCA3BB641C',
        '0x0Ba6D5893166676B18Ab798a865671d36F11b793'
    ]

    const handleSearchChange = (e) => {
        setAddressChecker(e.target.value)
    }

    const handleCheckAddress = () => {
        if (whitelist.includes(addressChecker)) {
            setIsWhiteListUser("whiteList");
        } else {
            setIsWhiteListUser("notWhiteList");
        }
    }

    const handleKeyDown = (event) => {
        console.log('sdfasfasdfsdfasdf');
        // if (event.key === "Enter") {
        //     handleCheckAddress();
        //   }
    }

    return (
        <>
            <motion.div className="chapter-container"
                initial={{ opacity: 0, transition: { duration: 0.8 } }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
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

                    <ReactPlayer className="d-none" url={Bgm} playing={true} controls={false} volume={1} muted={false} loop={true} />

                    {isWhiteListUser === '' ?
                        <>
                            <div className={`video-container`}>
                                <ReactPlayer className={`jasper-video`} url={WCJasperWave} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true} />
                            </div>
                            <div className="type-box w-75 mt-5">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            // .pauseFor(400)
                                            .typeString(" Welcome everyone, Shylock is reaching the climax of rescuing Ken from the SERA Gang.")
                                            .pauseFor(300)
                                            .typeString(" To honor your services, we will be rewarding those who helped him in his missions and recruit them as Agents. ")
                                            .pauseFor(700)
                                            .typeString(" Print your Agent ID's here by entering your wallet address below. ")
                                            .start();
                                    }}
                                    options={{
                                        loop: false,
                                        delay: 40,
                                        pauseFor: 100000,
                                    }}
                                />
                            </div>
                            <div className="wallet-checker-box animate__animated animate__fadeInUp">
                                <div className="w-100">
                                    <div className='d-flex w-100'>
                                        <input type="text" className="input-field me-2" name='whiteListAddress' value={addressChecker} onChange={handleSearchChange} onkeydown={handleKeyDown} />
                                        <button className="dapp_btn check-btn" onClick={handleCheckAddress}>Check</button>
                                    </div>
                                </div>
                            </div>
                        </>
                        : ""
                    }

                    {isWhiteListUser === 'whiteList' ?
                        <>
                            <ReactPlayer className={`wl-video`} url={WLVideo} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true} />
                           <div className="d-flex align-items-center justify-content-center">
                           <a className="mx-2" target='_blank' href="https://twitter.com/intent/tweet?text=Finally%2C%20I%20am%20an%20Agent%20for%20%40shylocknft.%20Our%20journey%20has%20begun.%0a%0a%23SolvewithShylock%0a&url=https%3A%2F%2Ftwitter.com%2Fi%2Fstatus%2F1622315651716235264" rel="noreferrer">
                                <button className="animate__animated animate__fadeInUp collect-btn dapp_btn mb-3">{'<< Collect >>'}</button> 
                            </a>
                             <a className="mx-2" target='_blank' href="https://twitter.com/i/communities/1617125757742116864" rel="noreferrer">
                             <button className="animate__animated animate__fadeInUp collect-btn dapp_btn mb-3">{'<< Join Agents Community >>'}</button>
                            </a>
                           </div>
                            
                        </>
                        // <div className="msg-box glowing-box mt-4">
                        //     <div>
                        //         Congratulations you are whiteListed
                        //     </div>
                        // </div>
                        : isWhiteListUser === 'notWhiteList' ?
                            <>
                                <ReactPlayer className={`wl-video`} url={notWLVideo} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true} />
                                <a className="animate__animated animate__fadeInUp collect-btn" target='_blank' href="https://twitter.com/intent/tweet?text=True%20Agents%20of%20%40shylocknft%20wouldn't%20back%20down%20from%20a%20challenge.%20I'll%20prove%20my%20worth%20and%20get%20promoted%20to%20Agent.%0a%0a%23SolvewithShylock%0a&url=https%3A%2F%2Ftwitter.com%2Fi%2Fstatus%2F1622315651716235264" rel="noreferrer">
                                    <button className="dapp_btn mb-3">{'<< Collect >>'}</button>
                                </a>
                            </>
                            // <div className="msg-box glowing-box mt-4">
                            //     <div>
                            //         Sorry, you are not Whitelisted
                            //     </div>
                            // </div>
                            : ""}

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
    )
}

export default WalletCheckerPage