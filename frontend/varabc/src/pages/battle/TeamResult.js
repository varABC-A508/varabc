
export const TeamResult = ({ team, teamNumber, isWin, submitList }) => {
  return (
    <div>
      <table className="h-[700px] text-[30px] text-white text-center font-bold ">
        <tbody className="flex flex-col justify-between h-[680px]">
          <tr>
            <td >
              {isWin ? <h1 className="text-[100px] italic mb-[5px]">Winner</h1> : <h1 className="text-[100px] italic mb-[5px]">&nbsp;</h1>}
            </td>
            <td  className="flex justify-center mt-[10px]">
              <p>team {teamNumber}</p>
            </td>
          </tr>
          <tr >
            <td className="flex flex-row ml-[10px] justify-center mt-[3px]">
              <div>{team[0].member.nickname}</div>
              <div>{team[1].member.nickname}</div>
              {/* <img src={ team[0] && team[0].member ? team[0].member.memberImage : ""} alt="playerProfile" className="w-[120px] h-[120px] rounded-[16px] border-2 mr-5" />
              <img src={ team[1] && team[1].member ? team[1].member.memberImage : ""} alt="playerProfile" className="w-[120px] h-[120px] rounded-[16px] border-2" /> */}
              {/* <img src={ team[0].member.memberImage } alt="playerProfile" className="w-[120px] h-[120px] rounded-[16px] border-2 mr-5" />
              <img src={ team[1].member.memberImage } alt="playerProfile" className="w-[120px] h-[120px] rounded-[16px] border-2" /> */}
            </td>
          </tr>
          <tr>
            <td  className="flex justify-center h-[20px] ">
              {isWin ? <p className="text-emerald-300">맞았습니다!</p> : <p className="text-red-400">틀렸습니다</p>}
            </td>
          </tr>
          <tr>
            <td  className="flex justify-center h-[20px] pt-[10px]">
              {isWin ? <p className="text-emerald-300">+5</p> : <p className="text-red-400">-5</p>}
            </td>
          </tr>
          <tr>
            <td  className="flex justify-center h-[20px] pt-[10px] ">
              {(submitList && submitList.length > 0) ? `${submitList[submitList.length - 1].submitUsedMemory}KB` : ""}
            </td>
          </tr>
          <tr>
            <td  className="flex justify-center h-[20px] pt-[10px]">
              {(submitList && submitList.length > 0) ? `${submitList[submitList.length - 1].submitUsedTime}ms` : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};