import { Link } from "react-router-dom";

export const BattleMode = () => {
    
  return (
    <>
      <div>
        <Link to="/battle/room">방 만들기</Link>
        <button>랜덤 매칭</button>
      </div>
    </>
  );
}