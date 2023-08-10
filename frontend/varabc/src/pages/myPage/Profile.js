import profile2 from "../../img/test/profile2.png";
import ProfileImage from '../../components/common/ProfileImage';
import badge from '../../img/tier/diamond.png';

const user = {
    userName:"DP조아",
    userTier: "diamond",
    userEmail: "dpdpdp@ssafy.edu",
    userProfileMessage: "절대 즉시 코드 배틀",
    userProfileImage: profile2,
};


export const Profile = () => {
    return (
      <div className="w-full p-[40px]">
        <div className="text-white text-[36px] font-bold mt-[20px] mb-[20px]">
          {user.userName}의 프로필
        </div>
        <div className="flex items-center justify-between pr-[20px]">
          <ProfileImage size="x-large" imgLink={user.userProfileImage} />
          <div className="bg-primary w-[620px] h-[360px] rounded-[15px] p-[30px]">
            <div className="text-point">
              <div className="flex items-center">
                <img src={badge} alt="티어" className="w-[75px] h-[60px]" />
                <div className="text-[48px] ml-[10px]">
                  {user.userTier.toUpperCase()}
                </div>
              </div>
              <div className="text-[64px] font-bold">{user.userName}</div>
            </div>
            <div className="text-white text-[24px] mt-[20px]">
              <div className="mb-[40px]">이메일 {user.userEmail}</div>
              <div>{user.userProfileMessage}</div>
            </div>
          </div>
        </div>
        <div className="mt-[85px] text-gray-300 text-[16px]">계정 탈퇴하기</div>
      </div>
    );
};