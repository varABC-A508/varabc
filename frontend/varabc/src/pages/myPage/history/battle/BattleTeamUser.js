import { calculateTier } from "../../../../utils/problemUtil";

const BattleTeamUser = ({ user }) => {
  return (
    <div className="flex items-center font-bold text-[24px]">
      <img
        src={calculateTier((user?.userTier || 0))[0]}
        alt={`${user?.userName} 프로필`}
        className="w-[45px] h-[45px]"
      />
      <div>{user.userName || "유저"}</div>
    </div>
  );
};

export default BattleTeamUser;
