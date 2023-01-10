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
    a.download = 'puzzle_1.jpg';
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
            <a className='mx-2' href=" https://twitter.com/intent/tweet?text=I%27ve%20just%20entered%20the%20shylocknft.com.%20Waiting%20to%20meet%20Detective%20Shylock%20and%20get%20early%20access%20to%20The%20Shades.%0a&via=shylocknft&%0a&url=https%3A%2F%2Ftwitter.com%2Fshylocknft%2Fstatus%2F1604180496463802370%3Fs%3D20%26t%3DrfXGfH-kpQgSvDNjy4ArCg%0a&hashtags=SolvewithShylock">
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