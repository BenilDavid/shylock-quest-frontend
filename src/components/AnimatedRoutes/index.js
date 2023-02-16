import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import QuestImagePage from '../QuestImagePage/index';
import QuestionPage from '../QuestionPage/index';
import ChapterPage from '../ChapterPage';
import App from '../../App';
import { AnimatePresence } from "framer-motion";
import LeaderboardPage from '../LeaderboardPage';
import WalletCheckerPage from '../WalletCheckerPage';
import MintingDapp from '../MintingDapp';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <div>
            <AnimatePresence>
                <Routes location={location} key={location.pathname} >
                    <Route exact path="/" element={<App />} />
                    <Route exact path="/wallet-checker" element={<WalletCheckerPage />} />
                    <Route exact path="/mint" element={<MintingDapp />} />
                    <Route exact path="/explore" element={<ChapterPage />} />
                    <Route exact path="/explore/:day" element={<QuestionPage />} />
                    <Route exact path="/quest-lore" element={<QuestImagePage />} />
                    <Route exact path="/leaderboard" element={<LeaderboardPage />} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default AnimatedRoutes