import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faUserGroup, faCircleCheck, faStar, faServer, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import { TeamResult } from "./TeamResult";
import profile1 from '../../img/test/profile1.png';
import profile2 from '../../img/test/profile2.png';
import { useNavigate } from "react-router-dom";

import BattleImage from "../../img/battleimg.png";

const team1 = {
  teamNo: 1,
  isMyTeam: true,
  isWinner: true,
  time: '348ms',
  storage: '71248KB',
  player1: {
    nickname: "DP조아",
    id: "alias1031",
    url: profile2,
  },
  player2: {
    nickname: "잠자는커비",
    id: "sleepingkurby",
    url: profile1,
  }
};

const team2 = {
  teamNo: 2,
  isMyTeam: false,
  isWinner: false,
  time: '448ms',
  storage: '73248KB',
  player1: {
    nickname: "DP조아",
    id: "alias1031",
    url: profile2,
  },
  player2: {
    nickname: "잠자는커비",
    id: "sleepingkurby",
    url: profile1,
  }
}

export const BattleResultPage1 = () => {
  const navigate = useNavigate();

  const handelOnClick = () => {

    navigate("/battle/result2", {state: {team1, team2}});
    console.log('이동');
  };

  return (
    <div className="flex justify-center">
      <div className='w-[1400px] h-[750px] flex justify-center bg-gray-700 m-8 rounded-[30px] shadow-lg z-50 '>
        <div className="flex justify-around ml-[80px]">
          <TeamResult team={team1.isMyTeam ? team1 : team2} />
          <div className='flex flex-col justify-between text-white text-5xl'>
            <img src={BattleImage } alt='<a href="https://www.freepik.com/free-psd/trophy-cup-icon-isolated-3d-render-illustration_28991002.htm#page=2&query=3d%20result&position=27&from_view=search&track=ais">Image by Xvect intern</a> on Freepik' className='w-[300px] h-[300px] m-[5px]' />
            <FontAwesomeIcon className=" m-4 " icon={faUserGroup} />
            <FontAwesomeIcon className=" m-4" icon={faStar} />
            <FontAwesomeIcon className=" m-4 " icon={faCircleCheck} />
            <FontAwesomeIcon className=" m-4" icon={faBolt} />
            <FontAwesomeIcon className=" m-4" icon={faServer} />
          </div>
          <TeamResult team={team1.isMyTeam ? team2 : team1} />
        </div>
        <div className='flex items-center text-white text-[70px] mt-[170px] ml-[100px] mr-[30px]'>
          <FontAwesomeIcon onClick={handelOnClick} team1={team1} team2={team2} icon={faCircleArrowRight} />
        </div>
      </div>
    </div>
  );
};