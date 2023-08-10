import BattleTeam from "./BattleTeam";

const gameResult = {
  1: "bg-green",
  0: "bg-red",
}

const BattleHistoryItem = ({battle}) => {
    return (
      <div className="p-[20px] w-full h-[125px] flex items-center justify-between text-white border-b-[2px] border-black cursor-pointer">
        <BattleTeam team={battle.team1} />
        <div className="flex flex-col items-center justify-between w-[500px]">
          <div className="text-[16px] font-bold">
            <span>출처</span>
            <span>난이도</span>
          </div>
          <div className="text-[24px] font-bold">번호.제목</div>
          <button className={`mt-[5px] w-[100px] h-[28px] text-[16px] font-bold ${gameResult[battle.result]} text-primaryDark rounded-full`}>코드 보기</button>
        </div>
        <BattleTeam team={battle.team2} />
      </div>
    );
};

export default BattleHistoryItem;