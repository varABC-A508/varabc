import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsIdeShown } from '../../../redux/Reducer/ideReducers';

const Timer = () => {
  const TWO_MINUTES = 120;
  const [seconds, setSeconds] = useState(TWO_MINUTES);
  const [isAlertShown, setIsAlertShown] = useState(false);

  const isIdeShown = useSelector((state) => state.ide.isIdeShown);
  const dispatch = useDispatch();

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
      console.log('2분이 지났습니다!');
	    setSeconds(TWO_MINUTES);
      setIsAlertShown(false);
      dispatch(setIsIdeShown(!isIdeShown));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, isAlertShown, dispatch]);

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