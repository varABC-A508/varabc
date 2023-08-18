import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import socket from '../../../modules/socketInstance';
import swal from 'sweetalert';

const MoveWaitingRoomButton = () => {

  socket.on('logMessage', (message) => {
    // 로그 메시지를 받아서 화면에 표시
    console.log('express log:', message);
  });

  const fetchCreatorNo = () => {
    const userToken = localStorage.getItem('access-token');
    axios.get(`https://varabc.com:8080/member/getUserInfo`, {headers: {
      "access-token": userToken
    }}).then((res) => {
      fetchRoomId(res.data.userInfo.memberNo);
    }).catch((err) => {
      swal ( "이런" ,  "로그인부터 해주세요!",  "error" );
      navigate("/");
    });
  };

  const fetchRoomId = (memberNo) => {
    axios.post(`https://varabc.com:8080/battle/newRoom/${memberNo}`).then((res) => {
      const splitUrl = res.data.split('/');
      socket.emit('createWaitingRoom', {
        roomToken: splitUrl[splitUrl.length - 1],
        memberNo: memberNo 
      });
      sessionStorage.setItem('userRoomIndex', JSON.stringify(1));
      navigate(res.data);
    }).catch((err) => {
      swal ( "이런" ,  "서버에 문제가 있어요. 잠시후 다시 시도해 주세요!",  "error" );
      navigate("/");
    });
  };

  const navigate = useNavigate();

  const onButtonClick = () => {
    fetchCreatorNo();
  };

  return (
    <button onClick={onButtonClick} className="absolute mt-[500px] group flex justify-center items-center font-bold bg-white text-primary w-[420px] h-[100px] text-[44px] rounded-full">
      방 만들기
      <FontAwesomeIcon className="text-primary flex ml-4" icon={faArrowRightFromBracket} />
    </button>
  );
}
export default MoveWaitingRoomButton;