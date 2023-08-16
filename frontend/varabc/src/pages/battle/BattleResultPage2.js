import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

import SmButton from "../../components/common/Button/SmButton";
import BattleImage from "../../img/battleimg.png";
import SubmissionList from "../../components/SubmissionList/SubmissionList";

import { useLocation, useNavigate, useParams } from "react-router-dom";

export const BattleResultPage2 = () => {

  const navigate = useNavigate();
  const { roomToken } = useParams();
  const { state } = useLocation();
  const { gameResult, winTeamSubmitList, loseTeamSubmitList } = state;

  let isMyTeamWin = (sessionStorage.getItem('team-token') === gameResult.winTeamToken) ? true : false;

  const onButtonClick = () => {
    const teamToken = sessionStorage.getItem('team-token');
    navigate(`/battle/${roomToken}/${teamToken}/review`, {state: { gameResult }});
  };

  return (
    <div className="flex justify-center relative">
      <div className='w-[1400px] h-[800px] bg-gray-700 m-8 rounded-[30px] shadow-lg z-50 '>
        <img src={BattleImage} alt='FreePickimage' className='absolute flex w-[400px] h-[400px] mt-[0px] pt-[0px] ml-[25px]' />
        <p className="absolute flex text-[100px] text-white m-10 text-center font-bold italic mt-[80px] ml-[550px]" >{isMyTeamWin ? 'You Win!!' : 'You Lose'}</p>
        <FontAwesomeIcon className='absolute flex text-white text-[60px] mt-[400px] ml-[30px]' icon={faCircleArrowLeft} />
        <p className="absolute flex text-[50px] text-white m-5 text-center font-bold  mt-[380px] ml-[150px]">Win Team</p>
        {/* 제출 리스트에 값을 설정하는 부분이 필요해요 일단 위치만 지정함 */}
        <div className='absolute flex mt-[280px] ml-[310px]'>
          <SubmissionList submitList={winTeamSubmitList} />
        </div>
        <p className="absolute flex text-[50px] text-white m-5 text-center font-bold mt-[560px] ml-[150px]">Lose Team</p>
        <div className='absolute flex mt-[510px] ml-[310px]'>
          <SubmissionList submitList={loseTeamSubmitList} />
        </div>
        <div className="absolute flex mt-[750px] ml-[1200px]">
          <SmButton
            text="확인"
            onClick={onButtonClick}
            bgColor="green"
          />
        </div>
      </div>
    </div>
  );
};