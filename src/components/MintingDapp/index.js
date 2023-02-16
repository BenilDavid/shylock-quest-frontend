import React, { useRef, useEffect } from "react";
// import logo from '../../shylock-logo.png';
// import twitterIcon from '../../twitter.png';
// import ReactPlayer from 'react-player';
// import Typewriter from 'typewriter-effect';
import 'animate.css';
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from 'axios';
import { motion } from "framer-motion";
import './MintingDapp.scss';

const MintingDapp = () => {
    // let navigate = useNavigate();
    const objectRef = useRef(null);

    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);

    useEffect(() => {
        function handleKeyDown(e) {
            // var object = document.getElementsByClassName('object');
            console.log("key pressed", parseInt(objectRef.current.style.top));
            if (parseInt(objectRef.current.style.top) > 0) {
                if (e.keyCode === 38) {
                    objectRef.current.style.top =
                        parseInt(objectRef.current.style.top || 0) - 10 + "px";

                } else if (e.keyCode === 40) {
                    objectRef.current.style.top =
                        parseInt(objectRef.current.style.top || 0) + 10 + "px";
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <motion.div className="chapter-container"
                initial={{ opacity: 0, transition: { duration: 0.8 } }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="app-container">
                    <div className="tunnel">
                        <div className="object" ref={objectRef}></div>
                    </div>
                </div>

            </motion.div>
        </>
    )
}

export default MintingDapp