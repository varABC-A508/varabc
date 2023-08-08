
const PlayerProfile = ({player}) => {
    return (
        <div className="flex justify-start items-center w-[370px] h-[120px]">
            <div>
                <img src={player.url} alt="playerProfile" className="w-[120px] h-[120px] rounded-[16px] border-2" />
            </div>
            <div className="ml-5">
                <div className="text-white font-bold text-[40px]">{player.nickname}</div>
                <div className="text-white font-bold text-[24px]">#{player.id}</div>
            </div>
        </div>
    );
};

export default PlayerProfile;