import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../../modules/socketInstance";
import swal from 'sweetalert';

const StartGameButton = ({roomToken, members }) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  socket.on('logMessage', (message) => {
    // 로그 메시지를 받아서 화면에 표시
    console.log('express log:', message);
  });

  socket.on('getTeamUrl', ({ url, teamNo, teamMateNo }) => {
    sessionStorage.setItem('teamNo', teamNo);
    sessionStorage.setItem('teamMateNo', teamMateNo);
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
    axios.post(
      `https://varabc.com:8080/battle/start/${roomToken}`,
      {
        "roomCode": roomToken,
        "problemNo": 31,
        "competitionResultT1M1No": members[0].member.memberNo,
        "competitionResultT1M2No": members[1].member.memberNo,
        "competitionResultT2M1No": members[2].member.memberNo,
        "competitionResultT2M2No": members[3].member.memberNo
      }).then((res) => {
        const url1 = res.data.url1;
        const url2 = res.data.url2;
        const splitUrl1 = url1.split('/');
        const splitUrl2 = url2.split('/');
        const teamToken1 = splitUrl1[splitUrl1.length - 1];
        const teamToken2 = splitUrl2[splitUrl1.length - 1];
        socket.emit('onGameStart', {
          roomToken: roomToken,
          url1: url1,
          url2: url2,
          teamToken1: teamToken1,
          teamToken2: teamToken2
        });
      }).catch((err) => {
        swal ( "이런" ,  "서버에 문제가 있습니다. 잠시후 다시 시도해주세요!" ,  "error" );
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
        className={`${isDisabled ? "bg-gray-700" : "bg-point"} text-white flex justify-center items-center rounded-lg font-bold w-[358px] h-[100px] text-[64px]`}
        disabled={isDisabled}
      >
        START!
      </button>
    );
};

export default StartGameButton;