import BattleTeamUser from "./BattleTeamUser";

const BattleTeam = ({team}) => {
  return (
    <div className="h-full flex flex-col justify-around w-[200px]">
      <BattleTeamUser user={team.user1} />
      <BattleTeamUser user={team.user2} />
    </div>
  );
};

export default BattleTeam;