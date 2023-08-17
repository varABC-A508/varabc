import { useState } from "react";
import BattleHistory from "./battle/BattleHistory";
import PracticeHistory from "./PracticeHistory";

export const History = () => {
  const [tab, setTab] = useState(1);

  return (
    <div className="w-full p-[20px] h-screen">
      <div className="text-white text-[36px] font-bold mb-[20px]">내 전적</div>
      <div className="mb-[20px]">
        <button
          onClick={(e) => setTab(1)}
          className={
            "mr-[20px] text-[24px] w-[120px] h-[50px] p-1 font-bold rounded " +
            (tab === 1
              ? "text-primaryDark bg-point"
              : "text-white bg-primaryDark")
          }
        >
          배틀모드
        </button>
        <button
          onClick={(e) => setTab(2)}
          className={
            "text-[24px] w-[120px] h-[50px] p-1 font-bold rounded " +
            (tab === 2
              ? "text-primaryDark bg-point"
              : "text-white bg-primaryDark")
          }
        >
          연습모드
        </button>
      </div>
      <div className="min-h-[500px]">
        {tab === 1 ? <BattleHistory /> : <PracticeHistory />}
      </div>
    </div>
  );
};
