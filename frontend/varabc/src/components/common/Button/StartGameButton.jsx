import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../modules/socketInstance";

const StartGameButton = ({roomToken, members }) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  socket.on('logMessage', (message) => {
    // 로그 메시지를 받아서 화면에 표시
    console.log('express log:', message);
  });

  socket.on('getTeamUrl', ({ url }) => {
    console.log("게임이 시작되려고 합니다!");
    sessionStorage.setItem('isPractice', JSON.stringify(false));
    navigate(url);
  });

  useEffect(() => {
    console.log("멤버 수가 변경되었습니다!: " + members.length);
    if(members.length === 4){ 
      setIsDisabled(false);
    }
  // eslint-disable-next-line
  }, [members.length])

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
        console.log(res.data);
        console.log("시작할 방의 룸 토큰: ");
        console.log(roomToken);
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