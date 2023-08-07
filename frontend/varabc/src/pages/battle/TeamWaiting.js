import AddPlayerButton from "./AddPlayerButton";
import PlayerProfile from "./PlayerProfile";


const TeamWaiting = ({players}) => {
    console.log(players);
    return (
        <div className="flex flex-col bg-primaryDark w-[414px] h-[416px] rounded-[25px] p-5 justify-around items-center">
            <div className="text-white text-[48px] font-bold">Team {players.teamNo}</div>
            {players.player1.isEmpty ? <AddPlayerButton /> : <PlayerProfile player={players.player1} />}
            {players.player2.isEmpty ? <AddPlayerButton /> : <PlayerProfile player={players.player2} />}
        </div>
    );
};

export default TeamWaiting;