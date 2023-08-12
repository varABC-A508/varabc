import AddPlayerButton from "./AddPlayerButton";
import PlayerProfile from "./PlayerProfile";


const TeamWaiting = ({player1, player2, teamNo}) => {
    return (
        <div className="flex flex-col bg-primaryDark w-[414px] h-[416px] rounded-[25px] p-5 justify-around items-center">
            <div className="text-white text-[48px] font-bold">Team {teamNo}</div>
            {player1 ? <AddPlayerButton /> : <PlayerProfile player={player1} />}
            {player2 ? <AddPlayerButton /> : <PlayerProfile player={player2} />}
        </div>
    );
};

export default TeamWaiting;