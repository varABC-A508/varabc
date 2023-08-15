import BattleTeam from "../BattleTeam";
import ProblemBasicInfo from "../../code/ProblemBasicInfo";

const BattleInfo = ({ battle }) => {
  return (
    <div className="p-[20px] w-full h-[125px] flex items-center justify-between text-white ">
      <BattleTeam team={battle.team1} />
      <ProblemBasicInfo problemData={battle.problem} />
      <BattleTeam team={battle.team2} />
    </div>
  );
};

export default BattleInfo;
