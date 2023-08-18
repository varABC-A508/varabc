import React, { useEffect, useState } from "react";
import Review from "../../components/Review/Review";
// import MoveRoundButton from "../../components/common/Button/MoveRoundButton";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import socket from "../../modules/socketInstance";
import EndBattleButton from "../../components/common/Button/EndBattleButton";

export const TeamReview = () => {

  const { roomToken } = useParams();
  const userRoomIndex = parseInt(sessionStorage.getItem('userRoomIndex'));
  let teamMateIndex;

  const [teamMate, setTeamMate] = useState({});
  const [comment, setComment] = useState("");

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    switch(userRoomIndex) {
       // eslint-disable-next-line
      case 1: teamMateIndex = 2;
      break;
       // eslint-disable-next-line
      case 2: teamMateIndex = 1;
      break;
       // eslint-disable-next-line
      case 3: teamMateIndex = 4;
      break;
       // eslint-disable-next-line
      case 4: teamMateIndex = 3;
      break;
      default: break;
    }
    // console.log("나의 페어 index: " + teamMateIndex);
    socket.emit('getTeamMateInfo', ({ roomToken, teamMateIndex }));
    // eslint-disable-next-line
  }, [])
  
  socket.on('sendTeamMateInfo', ({ teamMateInfo }) => {
    setTeamMate(teamMateInfo);
  });

  return (
    <div className="flex justify-center relative">
      <div className="flex justify-center">
        <div className='w-[1400px] h-[750px] flex justify-center text-white bg-gray-700 m-8 rounded-[30px] shadow-lg z-50 '>
          <div className="absolute flex flex-col font-bold mt-[70px] mr-[300px]" >
            <h3 className="text-[70px]">짝의 코딩이 어땠나요?</h3>
            <p className="text-[40px]">짝을 위해 소중한 피드백을 남겨주세요!</p>
          </div>
          <div className="absolute flex items-center flex-col w-[760px] h-[500px] mt-[280px] mr-[300px]">
            <Review />
            <br />
            <textarea onChange={onCommentChange} value={comment} className="rounded-[30px] text-black p-[20px]" cols={100} rows={5}></textarea>
          </div>
          <div className="absolute flex flex-col mt-[80px] ml-[700px]">
            <div className="absolute flex flex-col">
              <div>
                <img src={ teamMate && teamMate.member ? teamMate.member.memberImage : "" } alt="playerProfile" className="w-[300px] h-[300px] rounded-[16px] border-2" />
              </div>
              <div className="ml-[50px] mb-[50px]">
                <div className="text-white font-bold text-[36px]">{teamMate && teamMate.member ? teamMate.member.memberNickname : ""}</div>
              </div>
              {/* <MoveRoundButton to={"/"} text={"회의 하기"} bgColor={"basic"} btnSize={"basic"} /> */}
              <br />
              <EndBattleButton comment={comment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}