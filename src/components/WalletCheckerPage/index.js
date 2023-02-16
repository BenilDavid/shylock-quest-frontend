import React, { useState } from "react";
import logo from '../../shylock-logo.png';
import twitterIcon from '../../twitter.png';
// import ReactPlayer from 'react-player';
// import Typewriter from 'typewriter-effect';
import 'animate.css';
import { useNavigate, useLocation } from "react-router-dom";
// import axios from 'axios';
import { motion } from "framer-motion";
import './WalletCheckerPage.scss';

const WindowSize = "1000";

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

                    {window.innerWidth > WindowSize ?
                        <>
                            <div className="wallet-checker-box">
                                <div className="w-100">
                                    {/* <div>WhiteList Checker</div> */}
                                    <div className='d-flex w-100'>
                                        <input type="text" className="input-field me-2" name='whiteListAddress' value={addressChecker} onChange={handleSearchChange} />
                                        <button className="dapp_btn" onClick={handleCheckAddress}>Check</button>
                                    </div>
                                    {isWhiteListUser === 'whiteList' ?
                                        <div className="msg-box glowing-box mt-4">
                                            <div>
                                                Congratulations you are whiteListed
                                            </div>
                                        </div>
                                        : isWhiteListUser === 'notWhiteList' ?
                                            <div className="msg-box glowing-box mt-4">
                                                <div>
                                                    Sorry, you are not Whitelisted
                                                </div>
                                            </div>
                                            : ""}
                                </div>
                            </div>
                           
                            {/* <div>
                                <div className="binary-1">01010101011101100001101010101010101011101</div>
                                <div className="binary-2">01010101011101100001101010101010101011101</div>
                                <div className="binary-3">01010101011101100001101010101010101011101</div>
                                <div className="binary-4">01010101011101100001101010101010101011101</div>
                            </div> */}
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
    )
}

export default WalletCheckerPage