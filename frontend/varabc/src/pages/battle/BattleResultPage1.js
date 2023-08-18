import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faUserGroup, faCircleCheck, faStar, faServer, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import { TeamResult } from "./TeamResult";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import BattleImage from "../../img/battleimg.png";
import { useEffect, useState } from "react";
import axios from "axios";

export const BattleResultPage1 = () => {
  const navigate = useNavigate();
  const { roomToken } = useParams();
  const { state } = useLocation();
  const { gameResult } = state;
  const [winTeamSubmitList, setWinTeamSubmitList] = useState({});
  const [loseTeamSubmitList, setLoseTeamSubmitList] = useState({});

  useEffect(() => {
    axios.post(`https://varabc.com:8080/battle/finalResult/${roomToken}`, {
      "winnerTeam": gameResult.winTeamNo,
      "competitionResultT1M1No": gameResult.memberNos[0],
      "competitionResultT1M2No": gameResult.memberNos[1],
      "competitionResultT2M1No": gameResult.memberNos[2],
"     competitionResultT2M2No": gameResult.memberNos[3]
    }).then((res) => {
      setWinTeamSubmitList(res.data.winnerList);
      setLoseTeamSubmitList(res.data.loserList);
      console.log(res.data.loserList);
    }).catch();
    // eslint-disable-next-line
  }, [])

  const onButtonClick = () => {
    navigate(`/battle/${roomToken}/result2`, {state: { gameResult, winTeamSubmitList, loseTeamSubmitList }});
  };

  return (
    <div className="flex justify-center">
      <div className='w-[1400px] h-[750px] flex justify-center bg-gray-700 m-8 rounded-[30px] shadow-lg z-50 '>
        <div className="flex justify-around ml-[80px]">
          <TeamResult team={gameResult.winTeam} teamNumber={gameResult.winTeamNo} isWin={true} submitList={winTeamSubmitList} />
          <div className='flex flex-col justify-between text-white text-5xl'>
            <img src={BattleImage } alt='Freepickimg' className='w-[300px] h-[300px] m-[5px]' />
            <FontAwesomeIcon className=" m-4 " icon={faUserGroup} />
            <FontAwesomeIcon className=" m-4" icon={faStar} />
            <FontAwesomeIcon className=" m-4 " icon={faCircleCheck} />
            <FontAwesomeIcon className=" m-4" icon={faBolt} />
            <FontAwesomeIcon className=" m-4" icon={faServer} />
          </div>
          <TeamResult team={gameResult.loseTeam} teamNumber={gameResult.loseTeamNo} isWin={false} submitList={loseTeamSubmitList} />
        </div>
        <div className='flex items-center text-white text-[70px] mt-[170px] ml-[100px] mr-[30px]'>
          <FontAwesomeIcon onClick={onButtonClick} icon={faCircleArrowRight} />
        </div>
      </div>
    </div>
  );
};