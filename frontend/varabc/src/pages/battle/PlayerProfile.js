
const PlayerProfile = ({player}) => {
    return (
        <div className="flex justify-start items-center w-[370px] h-[120px]">
            <div>
                <img src={player.member.memberImage} alt="playerProfile" className="w-[100px] h-[100px] rounded-[16px] border-2" />
            </div>
            <div className="ml-5">
                <div className="text-white font-bold text-[30px]">{player.member.memberNickname}</div>
            </div>
        </div>
    );
};

export default PlayerProfile;