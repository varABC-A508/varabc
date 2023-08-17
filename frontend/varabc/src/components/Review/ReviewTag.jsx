// eslint-disable-next-line
import {useDispatch, useSelector} from 'react-redux';
import { toggleReadability, toggleNaming, toggleSpeed, toggleCommunication } from '../../redux/Reducer/reviewReducers';
import { useState } from 'react';

export default function ReviewTag({ index, content }) {

  const dispatch = useDispatch();
  const { readability, naming, speed, communication } = useSelector(
    (state) => state.review
  );

  const [isClicked, setIsClicked] = useState(false);

  const handleTagClick = (index) => {
    setIsClicked((prev) => !prev);
    switch (parseInt(index)) {
      case 0:
        dispatch(toggleReadability());
        console.log(readability);
        break;
      case 1:
        dispatch(toggleNaming());
        console.log(naming);
        break;
      case 2:
        dispatch(toggleSpeed());
        console.log(speed);
        break;
      case 3:
        dispatch(
          toggleCommunication()
        );
        console.log(communication);
        break;
      default:
        break;
    }
  };

  return (
    <div
      key={index}
      className={`inline-flex justify-center items-center m-3 w-[254px] h-[64px] rounded-[30px] cursor-pointer ${isClicked ? "bg-point": "bg-white" }`}
      onClick={() => handleTagClick(index)}
    >
      <span className="text-[#2E2E2E] text-2xl font-bold"># {content}</span>
    </div>
  );
}