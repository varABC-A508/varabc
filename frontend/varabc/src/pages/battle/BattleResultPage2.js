import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

import SmButton from "../../components/common/Button/SmButton";
import BattleImage from "../../img/battleimg.png";
import BattleSubmitList from "../../components/SubmissionList/BattleSubmitList";

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

  const movePage = () => {
    window.history.back();
  }

  return (
    <div className="flex justify-center relative">
      <div className='w-[1400px] h-[800px] bg-gray-700 m-8 rounded-[30px] shadow-lg z-50 '>
        <img src={BattleImage} alt='FreePickimage' className='absolute flex w-[400px] h-[400px] mt-[0px] pt-[0px] ml-[25px]' />
        <p className="absolute flex text-[100px] text-white m-10 text-center font-bold italic mt-[80px] ml-[550px]" >{isMyTeamWin ? 'You Win!!' : 'You Lose'}</p>
        <FontAwesomeIcon onClick={movePage} className='absolute flex text-white text-[60px] mt-[400px] ml-[30px]' icon={faCircleArrowLeft} />
        <div className='absolute flex mt-[280px] ml-[310px]'>
          <BattleSubmitList submitList={winTeamSubmitList} />
        </div>
        <div className='absolute flex mt-[510px] ml-[310px]'>
          <BattleSubmitList submitList={loseTeamSubmitList} />
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