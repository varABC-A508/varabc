import BattleTeam from "./BattleTeam";

const gameResult = {
  1: "bg-green",
  0: "bg-red",
};

const BattleHistoryItem = ({ battle, handleClick }) => {
  
  const teams = {
    team1: {
      user1:{
        userName: battle.nicknameT1M1, 
        userTier: battle.memberExpT1M1
      }, 
      user2: {
        userName: battle.nicknameT1M2, 
        userTier: battle.memberExpT1M2
  
      },
    }, 
    team2: {
      user1:{
        userName: battle.nicknameT2M1, 
        userTier: battle.memberExpT2M1
      }, 
      user2: {
        userName: battle.nicknameT2M2, 
        userTier: battle.memberExpT2M2
      },
    }
  }



  return (
    <div className="p-[20px] w-full h-[125px] flex items-center justify-between text-white border-b-[2px] border-black cursor-pointer" onClick={handleClick}>
      <BattleTeam team={teams.team1} />
      <div className="flex flex-col items-center justify-between w-[500px]">
        <div className="text-[16px] font-bold">
          <span>{battle.problemSource || '-'} / </span>
          <span>{battle.problemLevel || '-'}</span>
        </div>
        <div className="text-[24px] font-bold">{`${battle.problemNo || '0'}. ${battle.problemTitle || '-'}`}</div>
        <button
          className={`mt-[5px] w-[100px] h-[28px] text-[16px] font-bold ${
            gameResult[(battle.winner ? 1: 0)]
          } text-primaryDark rounded-full`}
        >
          코드 보기
        </button>
      </div>
      <BattleTeam team={teams.team2} />
    </div>
  );
};

export default BattleHistoryItem;
