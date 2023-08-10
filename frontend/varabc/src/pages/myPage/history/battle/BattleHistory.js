import { useEffect, useState } from "react";
import BattleHistoryItem from "./BattleHistoryItem";
import Pagination from '@mui/material/Pagination';
import { battleHistoryMockup } from "./battleHistoryMockup";

const BattleHistory = () => {
  const [battleHistory, setBattleHistory] = useState([]);
  useEffect(() => {
    setBattleHistory(battleHistoryMockup);
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const battleHistoryPerPage = 4;
  const pageNumber = Math.ceil(battleHistory.length / battleHistoryPerPage);
  const currentPageLast = currentPage * battleHistoryPerPage;
  const currentPageFirst = currentPageLast - battleHistoryPerPage;
  const currentBattleHistory = battleHistory.slice(currentPageFirst, currentPageLast);
  const onPageChange = (event, value) => {
    setCurrentPage(value); // 페이지 번호 업데이트
  };
  return (
    <div className="min-h-[500px]">
      <div className="bg-primaryDark rounded-[10px] min-h-[500px]">
        {currentBattleHistory.map((battle, index) => {
          return <BattleHistoryItem key={index} battle={battle} />;
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