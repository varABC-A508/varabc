import diamond from '../img/tier/diamond.png';
import profile2 from '../img/test/profile2.png';
import ProfileImage from '../components/common/ProfileImage';

const userTier = {
    "username": "DP조아",
    "solvedProblems": 187,
    "win": 134,
    "lose": 53,
    "profileMessage": "절대 즉시 코드 배틀",
    "tier": "diamond",
};

const tierList = {
    "copper": "COPPER",
    "iron": "IRON",
    "bronze": "BRONZE",
    "silver": "SILVER",
    "gold": "GOLD",
    "diamond": "DIAMOND",
};

const UserTier = () => {
    return (
        <div className="w-[1000px] h-[540px] bg-primary rounded-[30px] flex items-center justify-between">
            <div className="h-full flex flex-col">
                <div className="w-[440px] h-[400px] flex items-center justify-center">
                    <img src={diamond} alt="다이아" />
                </div>
                <div className="w-[440px] h-[100px] flex items-center justify-center font-bold text-[64px] text-point">{tierList[userTier.tier]}</div>
            </div>
            <div className="w-[560px] p-[40px] h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div className="text-[56px] font-bold text-point">{userTier.username}</div>
                    <ProfileImage size="medium" imgLink={profile2} />
                </div>
                <div className="text-[32px] font-bold">
                    <div className="text-white">푼 문제 수 {userTier.solvedProblems}회</div>
                    <div className="text-green">승리 {userTier.win}회</div>
                    <div className="text-red">패배 {userTier.lose}회</div>
                    <div className="text-white">승률 {((userTier.win / (userTier.win + userTier.lose)) * 100).toFixed(1)}%</div>
                </div>
                <div className="text-[28px] text-white mt-[10px]">{userTier.profileMessage}</div>
            </div>
        </div>
    );
};

export default UserTier;