import React from 'react'
import PuzzleImage from '../../Assets/puzzle-1.png';
import './QuestImagePage.scss';
import logo from '../../shylock-logo.png';
import twitterIcon from '../../twitter.png';
import { useNavigate } from "react-router-dom";

function QuestImagePage() {
  let navigate = useNavigate();

  function handleDownload() {
    const a = document.createElement('a');
    a.href = PuzzleImage;
    a.download = 'Shylock’s Quest Day 1.jpg';
    a.click();
  }

  function goToHomePage() {
    navigate('/');
  }

  return (
    <div className="app">
      <div className="app-container">

        <div className="header d-flex">

          <div className="logo-container cursor-pointer" onClick={() => goToHomePage()}>
            <img src={logo} className="shylock-logo" alt="logo" />
          </div>

        </div>

          <div className="d-flex align-items-center justify-content-center">
            <div className='image-container my-2'>
              <img className='puzzle-image' src={PuzzleImage} alt="" />
              <div className="d-flex justify-content-center align-items-center">
                  <button className='download-btn enter-btn mt-3 mx-2' onClick={handleDownload}>Collect Evidence</button>
              </div>
            </div>
          </div>

         <div className="d-flex align-items-center justify-content-center">
         <div className='Registered-container'>
            <div className="rules-heading">{'<<Upload your Evidence>>'}</div>
            <p>Share your mystery-solving experience by uploading the Evidence image above and Tag 3 potential Agents on your Twitter with whom you can join together to solve the case with Shylock.</p>
            <a className='mx-2' href="https://twitter.com/intent/tweet?text=Here%20is%20the%20piece%20of%20Intel%20%40shylocknft%2C%20that%20you're%20looking%20for.%20%20%20%0a%0aAgent%20%3C%3CEnter%20your%20Alias%3E%3E%2C%20reporting%20about%20Gregory%2C%20a%20formidable%20Eastern%20European%20mafia%20boss%20who%20controls%20the%20SERA%20gang%E2%80%99s%20operations%20in%20Europe.%20%20%20%0a%0aJoin%20me%20%3C%3C%40Tag%203%20friends%3E%3E%20to%20%23SolvewithShylock">
                  <button className='download-btn enter-btn'>{`>> Share <<`}</button>
                </a>
          </div>
         </div>

         <div className='footer'>
            <button className="twitter-btn">
              <a target="_blank" href="https://twitter.com/shylocknft" rel="noreferrer">
                <img src={twitterIcon} className="twitter-logo" alt="twitter" />
              </a>
            </button>
          </div>

      </div>
    </div>
  )
}

export default QuestImagePage;