import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

import SmButton from "../../components/common/Button/SmButton";
import BattleImage from "../../img/battleimg.png";
import SubmissionList from "../../components/SubmissionList/SubmissionList";

import { useLocation } from "react-router-dom";

const onClick = () => {
  console.log('이동');
};

export const BattleResultPage2 = () => {

  const location = useLocation();
  const team1 = location.state.team1;
  const team2 = location.state.team2;

  return (
    <div className="flex justify-center relative">
      <div className='w-[1400px] h-[800px] bg-gray-700 m-8 rounded-[30px] shadow-lg z-50 '>
        <img src={BattleImage} alt='<a href="https://www.freepik.com/free-psd/trophy-cup-icon-isolated-3d-render-illustration_28991002.htm#page=2&query=3d%20result&position=27&from_view=search&track=ais">Image by Xvect intern</a> on Freepik' className='absolute flex w-[400px] h-[400px] mt-[0px] pt-[0px] ml-[25px]' />
        <p className="absolute flex text-[100px] text-white m-10 text-center font-bold italic mt-[80px] ml-[550px]" >{team1.isMyTeam ? (team1.isWinner ? 'You Win!!' : 'You Lose..') : (team2.isWinner ? 'You Win' : 'You Lose')}</p>
        <FontAwesomeIcon className='absolute flex text-white text-[60px] mt-[400px] ml-[30px]' icon={faCircleArrowLeft} />
        <p className="absolute flex text-[50px] text-white m-5 text-center font-bold  mt-[380px] ml-[150px]">우리팀</p>

        {/* 제출 리스트에 값을 설정하는 부분이 필요해요 일단 위치만 지정함 */}
        <div className='absolute flex mt-[280px] ml-[310px]'>
          <SubmissionList />
        </div>
        <p className="absolute flex text-[50px] text-white m-5 text-center font-bold mt-[560px] ml-[150px]">상대팀</p>
        <div className='absolute flex mt-[510px] ml-[310px]'>
          <SubmissionList />
        </div>
        <div className="absolute flex mt-[750px] ml-[1200px]">
          <SmButton
            text="확인"
            onClick={onClick}
            bgColor="green"
          />
        </div>
      </div>
    </div>
  );
};