import MoveWaitingRoomButton from "../../components/common/Button/MoveWaitingRoom";

export const BattleMode = () => {
  
  return (
    <>
      <div className="w-screen h-screen bg-battle bg-cover pl-20 pr-20 items-center">
        <div className="w-full flex flex-col items-center justify-around">
          <div className="flex justify-center items-center w-[1000px] h-[350px] bg-black opacity-70 text-white text-[20px] mt-[200px] p-[40px] mb-[200px]">
            <div className="opacity-100"> * varABC 배틀 규칙 <br />
                      1. '방 만들기'를 눌러 방을 만들어 주세요. <br />
                      2. '초대 URL'을 눌러 초대 링크를 복사해 주세요. <br />
                      3. 친구들에게 URL을 보내 팀원을 모아주세요. <br />
                      4. 4명이 모두 모여 팀이 구성되었다면 활성화된 'START!' 버튼을 클릭해주세요. <br />
                      5. 자신의 차례를 확인하고 문제를 풀이하세요! (2분마다 파트너와 번갈아 작성할 수 있습니다.) <br />
                      6. 문제 풀이가 막힌다면 '마이크' 버튼을 눌러 파트너와 소통하세요. <br />
                      7. 먼저 정답 코드를 제출한 팀이 승리합니다. <br />
            </div>
          </div>
          <MoveWaitingRoomButton />
        </div>
      </div>
    </>
  );
}