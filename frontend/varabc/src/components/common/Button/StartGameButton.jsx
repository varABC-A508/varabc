import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const StartGameButton = ({roomToken, members}) => {
  const socket = io('http://localhost:3001', { reconnection: false });
  const userRoomIndex = JSON.parse(sessionStorage.getItem('userRoomIndex'));
  const [isDisabled, setIsDisabled] = useState(true);
  if(members.length === 4 && userRoomIndex === 1)
    setIsDisabled(false);

  const navigate = useNavigate();
  const splitTeam = () => {
    console.log("멤버1:" + members[0].member.memberNo);
    console.log("멤버2:" + members[1].member.memberNo);
    console.log("멤버3:" + members[2].member.memberNo);
    console.log("멤버4:" + members[3].member.memberNo);
    axios.post(
      `https://varabc.com:8080/battle/start/${roomToken}`,
      {
        "roomCode": roomToken,
        "problemNo": 1,
        "competitionResultT1M1No": members[0].member.memberNo,
        "competitionResultT1M2No": members[1].member.memberNo,
        "competitionResultT2M1No": members[2].member.memberNo,
        "competitionResultT2M2No": members[3].member.memberNo
      }).then((res) => {
        const url1 = res.data.url1;
        const url2 = res.data.url2;
        socket.emit('onGameStart', {
          roomToken: roomToken,
          url1: url1,
          url2: url2
        });
      }).catch((err) => {
        alert("서버에 문제가 생겼습니다! 나중에 다시 시도해주세요!" + err);
        navigate('/');
      })
    ;}

    const onButtonClick = () => {
      splitTeam();
    };
    return (
      <button
        onClick={onButtonClick}
        type="button"
        className={`bg-point text-white flex justify-center items-center rounded-lg font-bold w-[358px] h-[100px] text-[64px]`}
        disabled={isDisabled}
      >
        START!
      </button>
    );
};

export default StartGameButton;