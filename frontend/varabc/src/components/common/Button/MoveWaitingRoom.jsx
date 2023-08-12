import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { io } from "socket.io-client";

const MoveWaitingRoomButton = () => {
  const fetchCreatorNo = () => {
    const userToken = sessionStorage.getItem('access-token');
    axios.get(`https://varabc.com:8080/member/getUserInfo`, {headers: {
      "access-token": userToken
    }}).then((res) => {
      console.log("사용자 정보 가져오기:");
      console.log(res.data);
      fetchRoomId(res.data.userInfo.memberNo);
    }).catch((err) => {
      alert("서버에 문제가 생겼습니다! 나중에 다시 시도해주세요!");
      navigate("/");
    });
  };

  const fetchRoomId = (memberNo) => {
    axios.post(`https://varabc.com:8080/battle/newRoom/${memberNo}`).then((res) => {
      const socket = io('http://localhost:3001', {reconnection:false});
      const splitUrl = res.data.split('/');
      socket.emit('createWaitingRoom', {
        roomToken: splitUrl[splitUrl.length - 1],
        memberNo: memberNo 
      });
      navigate(res.data);
    }).catch((err) => {
      alert("서버에 문제가 생겼습니다! 나중에 다시 시도해주세요!");
      navigate("/");
    });
  };

  const navigate = useNavigate();

  const onButtonClick = () => {
    fetchCreatorNo();
  };

  return (
    <button onClick={onButtonClick} className="group flex justify-center items-center font-bold bg-white text-primary w-[420px] h-[100px] text-[44px] rounded-full">
      방 만들기
      <FontAwesomeIcon className="text-primary flex ml-4" icon={faArrowRightFromBracket} />
    </button>
  );
}
export default MoveWaitingRoomButton;