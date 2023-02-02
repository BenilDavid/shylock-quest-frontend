import React from 'react'
import logo from '../../shylock-logo.png';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import twitterIcon from '../../twitter.png';
import './LeaderboardPage.scss';

const LeaderboardPage = () => {
    let navigate = useNavigate();

    const leaderboardData = [
        {
            rank : 1,
            twitter : "mark",
            correctAnswer : 4
        },
         {
            rank : 2,
            twitter : "Jacob",
            correctAnswer : 3
        },
    ]

    return (
        <div>
            <motion.div className="App"
                initial={{ opacity: 0, transition: { duration: 0.8 } }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="app-container">
                    <div className="header d-flex justify-content-center">
                        {/* <div className="twitter-id back-btn ms-4">
            </div> */}
                        <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
                            <img src={logo} className="shylock-logo" alt="logo" />
                        </div>
                        {/* <div className={`metakey me-4 ${address ? "border-orange" : ""}`}>
              {address
                ? address.slice(0, 5) + "..." + address.slice(-5)
                : ""}
            </div> */}
                    </div>

                   <div className="outer-table d-flex flex-column justify-content-center table-responsive w-50">
                    <div className='my-3 fs-3'>{'<< LeaderBoard >>'}</div>
                   <table className="custom-table">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Twitter</th>
                                <th scope="col">Correct Answers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry the Bird</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                   </div>

                    <div className='footer'>
                        <button className="twitter-btn">
                            <a target="_blank" href="https://twitter.com/shylocknft" rel="noreferrer">
                                <img src={twitterIcon} className="twitter-logo" alt="twitter" />
                            </a>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default LeaderboardPage