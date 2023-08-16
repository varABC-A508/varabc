import React, { useEffect, useState } from "react";
import Review from "../../Review/Review";
import MoveRoundButton from "../../components/common/Button/MoveRoundButton";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import socket from "../../modules/socketInstance";

export const TeamReview = () => {

  // const navigate = useNavigate();
  const { roomToken } = useParams();
  // const { state } = useLocation();
  // const { gameResult } = state;
  const userRoomIndex = parseInt(sessionStorage.getItem('userRoomIndex'));
  const [teamMate, setTeamMate] = useState({});
  let teamMateIndex;

  useEffect(() => {
    switch(userRoomIndex) {
      case 1: teamMateIndex = 2;
      break;
      case 2: teamMateIndex = 1;
      break;
      case 3: teamMateIndex = 4;
      break;
      case 4: teamMateIndex = 3;
      break;
      default: break;
    }
    socket.emit('getTeamMateInfo', ({ roomToken, teamMateIndex }));
  }, [])
  
  socket.on('sendTeamMateInfo', ({ teamMateInfo }) => {
    setTeamMate(teamMateInfo);
    console.log("팀원의 정보");
    console.log(teamMateInfo);
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
            <textarea className="rounded-[30px]" cols={100} rows={10}></textarea>
          </div>
          <div className="absolute flex flex-col mt-[80px] ml-[700px]">
            <div className="absolute flex flex-col">
              <div>
                <img src={ teamMate ? teamMate.member.memberImage : ""} alt="playerProfile" className="w-[300px] h-[300px] rounded-[16px] border-2" />
              </div>
              <div className="ml-[50px] mb-[50px]">
                <div className="text-white font-bold text-[40px]">{teamMate ? teamMate.member.memberNickname : ""}</div>
                <div className="text-white font-bold text-[24px]">#{teamMate ? teamMate.member.memberNo : ""}</div>
              </div>
              <MoveRoundButton to={"/"} text={"회의 하기"} bgColor={"basic"} btnSize={"basic"} />
              <br />
              <MoveRoundButton to={"/"} text={"완료"} bgColor={"red"} btnSize={"basic"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}