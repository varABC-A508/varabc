import React from 'react';
import MoveRoundButton from './components/common/Button/MoveRoundButton';
import MoveSquareButton from './components/common/Button/MoveSquareButton';
import { Friends } from './pages/myPage/Friends';



const ButtonMoveTest = () => {
  return (
    <div>
      <div>
        <MoveRoundButton to="/battle" bgColor={'red'} btnSize={'big'} text={'Go to About'} />
        <MoveSquareButton to="/battle" bgColor={'green'} btnSize={'basic'} text={'Go'} />
      </div>

      <Friends />
    </div>
  );
};

export default ButtonMoveTest;