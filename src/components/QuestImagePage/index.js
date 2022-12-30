import React from 'react'
import QR_Code from '../../Assets/qr-code-orange.jpeg';
import './QuestImagePage.scss';

const QuestImagePage = () => {

  function handleDownload() {
    const a = document.createElement('a');
    a.href = QR_Code;
    a.download = 'puzzle_1.jpg';
    a.click();
  }

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className='image-container my-4'>
        <img className='puzzle-image' src={QR_Code} alt="" />

        <div className="d-flex justify-content-center align-items-center">
          <button className='download-btn enter-btn my-3' onClick={handleDownload}>Download</button>
        </div>

      </div>
    </div>
  )
}

export default QuestImagePage