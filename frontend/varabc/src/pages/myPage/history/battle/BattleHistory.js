import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BattleHistoryItem from "./BattleHistoryItem";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import swal from 'sweetalert';

const BattleHistory = () => {
  const navigate = useNavigate();
  const [noData, setNoData] = useState(true);
  const [battleHistory, setBattleHistory] = useState([
    {
      nicknameT1M1: "user1",
      nicknameT1M2: "user2",
      nicknameT2M1: "user3",
      nicknameT2M2: "user4",
      memberExpT1M1: 0,
      memberExpT1M2: 0,
      memberExpT2M1: 0,
      memberExpT2M2: 0,
      competitionResultNo: 0,
      problemSource: "출처",
      problemLevel: "레벨",
      problemTitle: "제목",
      problemNo: 0,
      isWinner: true,
    },
  ]);

  useEffect(() => {
    async function getBattleHistory() {
      const userToken = localStorage.getItem("access-token");
      if (!userToken) {
        swal ( "이런" ,  "회원가입부터 해주세요!" ,  "error" );
        navigate("/");
        return;
      }
      try {
        const userResponse = await axios.get(
          `https://varabc.com:8080/member/getUserInfo`,
          {
            headers: {
              "access-token": userToken,
            },
          }
        );

        const memberNo = userResponse.data.userInfo.memberNo;
        // console.log(memberNo)

        const response = await axios.get(
          `https://varabc.com:8080/mypage/battle/${memberNo}`
          //`https://varabc.com:8080/mypage/battle/36`
        );
        // console.log(response);

        if (response.status === 200) {
          setBattleHistory(response.data);
          setNoData(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getBattleHistory();
    // eslint-disable-next-line
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const battleHistoryPerPage = 4;
  const pageNumber = Math.ceil(battleHistory.length / battleHistoryPerPage);
  const currentPageLast = currentPage * battleHistoryPerPage;
  const currentPageFirst = currentPageLast - battleHistoryPerPage;
  const currentBattleHistory = battleHistory.slice(
    currentPageFirst,
    currentPageLast
  );
  const onPageChange = (event, value) => {
    setCurrentPage(value); // 페이지 번호 업데이트
  };

  const handleClick = (idx, battle) => {
    navigate(`/mypage/history/battle/detail/${idx}`, { state: battle });
  };

  if (noData) {
    return (
      <div className="flex justify-center text-white text-lg">
        아직 진행한 배틀이 없습니다!
      </div>
    );
  }

  return (
    <div className="min-h-[500px]">
      <div className="bg-primaryDark rounded-[10px] min-h-[500px]">
        {currentBattleHistory.map((battle, index) => {
          return (
            <BattleHistoryItem
              key={battle.competitionResultNo}
              battle={battle}
              handleClick={() =>
                handleClick(battle.competitionResultNo, battle)
              }
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center">
        <Pagination
          className="mt-[20px] bg-white"
          count={pageNumber}
          page={currentPage}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default BattleHistory;
