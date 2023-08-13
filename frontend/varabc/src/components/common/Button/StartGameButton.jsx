import axios from "axios";
import { useNavigate } from "react-router-dom";


const StartGameButton = ({roomToken, members}) => {
  let isDisabled;
  const userRoomIndex = JSON.parse(sessionStorage.getItem('userRoomIndex'));
  if(members.length !== 4 && userRoomIndex === 1)
    isDisabled = true;
  else
    isDisabled = false;

  const navigate = useNavigate();
  const splitTeam = () => {
    axios.post(
      `https://varabc.com:8080/battle/start/${roomToken}`,
      {
        "roomCode": roomToken,
        "problemNo": 1,
        "competitionResultT1M1No": members[0].memberNo,
        "competitionResultT1M2No": members[1].memberNo,
        "competitionResultT2M1No": members[2].memberNo,
        "competitionResultT2M2No": members[3].memberNo
      }).then((res) => {
        const url1 = res.data.url1;
        const url2 = res.data.url2;
        if(userRoomIndex < 2){
          navigate(url1);
        } else {
          navigate(url2);
        }
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