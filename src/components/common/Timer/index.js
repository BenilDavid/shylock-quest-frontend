import React from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp }) => {
    const {
        seconds,
        minutes,
        hours,
      } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    
  return (
    <div style={{textAlign: 'center'}}>
    <div style={{fontSize: '20px'}}>
      <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
    </div>
  </div>
  );
}

export default Timer;