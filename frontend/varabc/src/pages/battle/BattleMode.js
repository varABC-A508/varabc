import MoveWaitingRoomButton from "../../components/common/Button/MoveWaitingRoom";

export const BattleMode = () => {
  
  return (
    <>
      <div className="w-screen h-screen flex bg-battle bg-cover pl-20 pr-20 items-center">
        <div className="w-full flex justify-between p-20 mt-60">
          <MoveWaitingRoomButton />
        </div>
      </div>
    </>
  );
}