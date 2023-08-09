import diamond from '../img/tier/diamond.png';
import profile2 from '../img/test/profile2.png';

const userTier = {
    "username": "DP조아",
    "userId": "alias1031",
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
                <div className="w-[540px] h-[420px] flex items-center justify-center">
                    <img src={diamond} alt="다이아" />
                </div>
                <div className="w-[540px] h-[100px] flex items-center justify-center font-bold text-[64px] text-point">{tierList[userTier.tier]}</div>
            </div>
            <div>
                <div>
                    <div>
                        <div className="text-[52px] font-bold text-point">{userTier.username}</div>
                        <div className="text-[32px] font-bold text-point">#{userTier.userId}</div>
                    </div>
                    <div className="w-[120px] h-[120px]">
                        <img src={profile2} alt={userTier.username} />
                    </div>
                </div>
                <div>통계</div>
                <div>상태메세지</div>
            </div>
        </div>
    );
};

export default UserTier;