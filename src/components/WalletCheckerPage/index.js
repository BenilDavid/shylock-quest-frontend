import React, { useState } from "react";
import logo from '../../shylock-logo.png';
import twitterIcon from '../../twitter.png';
import Bgm from '../../Audio/shylock-bgm.mp3';
import ReactPlayer from 'react-player';
import Typewriter from 'typewriter-effect';
import WCJasperWave from '../../Video/wallet-checker-jasper.mp4';
import WLVideo from '../../Video/whitelist_agent.mp4';
import notWLVideo from '../../Video/nonWhitelist_agent.mp4';
import 'animate.css';
import { useNavigate, useLocation } from "react-router-dom";
// import axios from 'axios';
import { motion } from "framer-motion";
import './WalletCheckerPage.scss';
import WhitelistAddresses from "../../Data/WLaddress";
import { toast } from 'react-toastify';

const WalletCheckerPage = () => {
    let navigate = useNavigate();
    const { state: { metamaskId } } = useLocation();

    const [isWhiteListUser, setIsWhiteListUser] = useState("");
    //   const [isOpenWalletChecker, setisOpenWalletChecker] = useState(false);
    const [addressChecker, setAddressChecker] = useState("");

    const handleSearchChange = (e) => {
        setAddressChecker(e.target.value)
    }

    const handleCheckAddress = () => {
        if(addressChecker !== '' && addressChecker.length > 30){
            if (WhitelistAddresses.includes(addressChecker)) {
                setIsWhiteListUser("whiteList");
            } else {
                setIsWhiteListUser("notWhiteList");
            }
        }else{
            toast.error("please provide a valid address", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar',
                theme: "dark"
            })
            // console.log("please provide a valid address");
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



                    {isWhiteListUser === '' ?
                        <>
                            <ReactPlayer className="d-none" url={Bgm} playing={true} controls={false} volume={1} muted={false} loop={true} />
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
                            {/* <div className="d-flex align-items-center justify-content-center"> */}
                                <a className="mx-2" target='_blank' href="https://twitter.com/intent/tweet?text=Finally%2C%20I've%20become%20an%20Agent%20of%20%40shylocknft.%20Our%20mission%20of%20rescuing%20Ken%20from%20the%20SERA%20Gang%20starts%20on%20February%2025%2C%2001%3A00%20PM%20UTC.%0a%0a%23SolvewithShylock%0a&url=https%3A%2F%2Ftwitter.com%2Fshylocknft%2Fstatus%2F1622315651716235264%3Fs%3D46%26t%3Ddk088ZTY83_CfymyET9esg" rel="noreferrer">
                                    <button className="animate__animated animate__fadeInUp collect-btn dapp_btn mb-3">{'<< Collect >>'}</button>
                                </a>
                                <a className="mx-2" target='_blank' href="https://twitter.com/i/communities/1617125757742116864" rel="noreferrer">
                                    <button className="animate__animated animate__fadeInUp collect-btn dapp_btn mb-3">{'<< Enter Agents Lounge >>'}</button>
                                </a> 
                            {/* </div> */}

                        </>
                        // <div className="msg-box glowing-box mt-4">
                        //     <div>
                        //         Congratulations you are whiteListed
                        //     </div>
                        // </div>
                        : isWhiteListUser === 'notWhiteList' ?
                            <>
                                <ReactPlayer className={`wl-video`} url={notWLVideo} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true} />
                                <a className="mx-2" target='_blank' href="https://twitter.com/intent/tweet?text=True%20Agents%20of%20%40shylocknft%20wouldn't%20back%20down%20from%20a%20challenge.%20I%20will%20be%20waiting%20for%20a%20call%20from%20Shylock%20on%20February%2025%2C%2001%3A00%20PM%20UTC.%0a%0a%23SolvewithShylock%0a&url=https%3A%2F%2Ftwitter.com%2Fshylocknft%2Fstatus%2F1622315651716235264%3Fs%3D46%26t%3Ddk088ZTY83_CfymyET9esg" rel="noreferrer">
                                    <button className="animate__animated animate__fadeInUp collect-btn dapp_btn mb-3">{'<< Collect >>'}</button>
                                </a>
                                <a className="mx-2" target='_blank' href="https://alphabot.app/shylocknft" rel="noreferrer">
                                    <button className="animate__animated animate__fadeInUp collect-btn dapp_btn mb-3">{'<< Join Agents Raffle >>'}</button>
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