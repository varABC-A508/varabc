import MoveRoundButton from "../../components/common/Button/MoveRoundButton";
import MoveWaitingRoomButton from "../../components/common/Button/MoveWaitingRoom";

export const BattleMode = () => {
  
  return (
    <>
      <div className="w-screen h-screen flex bg-battle bg-cover pl-20 pr-20 items-center">
        <div className="w-full flex justify-between p-20 mt-60">
          <MoveWaitingRoomButton />
          <MoveRoundButton
            to="/battle/room"
            text="랜덤 매칭"
            bgColor="basic"
            btnSize="big"
          />
        </div>
      </div>
    </>
  );
}