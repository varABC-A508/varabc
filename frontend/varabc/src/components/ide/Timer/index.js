import { useState, useEffect } from 'react';
import socket from '../../../modules/socketInstance';
import { useSelector } from 'react-redux';

const Timer = () => {
  const TWO_MINUTES = 20;
  const [seconds, setSeconds] = useState(TWO_MINUTES);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const isPlayerTurn = useSelector((state) => state.ide.isPlayerTurn);

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
      socket.emit('onTimerEnd', { 
        isPlayerTurn: isPlayerTurn,
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
	    <h1 className='mt-1 mr-4 text-[24px]'>{formatTime(seconds)}</h1>
	  </div>
  );
};

export default Timer;