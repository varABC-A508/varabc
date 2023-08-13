import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";


const Timer = () => {
  const TWO_MINUTES = 20;
  const [seconds, setSeconds] = useState(TWO_MINUTES);
  const [isAlertShown, setIsAlertShown] = useState(false);

  const socket = io('https://varabc.com:3001', {reconnection:false});
  const params = useParams();
  const roomToken = params.roomToken;

  useEffect(() => {
    if(!isAlertShown){
      if (seconds <= 0) {
        setIsAlertShown(true);
      }
      else {
        const intervalId = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }
    } else {
      const isPlayerTurn = JSON.parse(sessionStorage.getItem('isPlayerTurn'));
      socket.emit('onTimerEnd', { 
        isPlayerTurn: isPlayerTurn,
        roomToken: roomToken
      });
	    setSeconds(TWO_MINUTES);
      setIsAlertShown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, isAlertShown]);

  const formatTime = (time) => {
	  const minutes = Math.floor(time / 60);
	  const seconds = time % 60;
	  return `${String(minutes)}:${String(seconds).padStart(2, '0')}`;
  };

  return (
	  <div>
	    <h1 className='mt-1 mr-4'>{formatTime(seconds)}</h1>
	  </div>
  );
};

export default Timer;