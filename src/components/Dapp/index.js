import React from "react";
// import logo from '../../shylock-logo.png';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactPlayer from 'react-player';
import TunnelCallVideo from '../../Video/Dapp/tunnel-video.mp4';
// import TunnelCallAudio from '../../Video/Dapp/call-tunnel-audio.mp3';
// import TunnelBgm from '../../Video/Dapp/dapp-bgm.mp3';

import './Dapp.scss';

const DappPage = () => {
    let navigate = useNavigate();
    // const { state: { metamaskId } } = useLocation();
// const [dappBgm, setDappBgm] = useState(false);

    const tunnelAudioEnded = () => {
        navigate('/minting');
    }

    // function handleProgress(state) {
    //     if (state.playedSeconds >= state.duration - 5) {
    //       setIsVideoEnding(true);
    //     }
    //   }

    return (
        <>
            <motion.div className="dapp-container"
                initial={{ opacity: 0, transition: { duration: 0.8 } }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="app-container">
                    {/* <div className="dapp-video-container"> */}
                    <ReactPlayer className={`dapp-video`} url={TunnelCallVideo} playing={true} controls={false} volume={1} muted={false} loop={false} playsinline={true} onEnded={tunnelAudioEnded}/>
                    {/* <ReactPlayer className="d-none" url={TunnelCallAudio} playing={true} controls={false} volume={1} muted={false} loop={false} />  */}
                    {/* <ReactPlayer className="d-none" url={TunnelBgm} playing={dappBgm} controls={false} volume={1} muted={false} loop={true} /> */}
                    </div>
                {/* </div> */}
            </motion.div>
        </>
    )
}

export default DappPage;