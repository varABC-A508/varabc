
export const TeamResult = ({ team }) => {
  return (
    <div>
      <table className="h-[700px] text-[30px] text-white text-center font-bold ">
        <tbody className="flex flex-col justify-between h-[680px]">
          <tr>
            <td >
              {team.isWinner ? <h1 className="text-[100px] italic mb-[5px]">Winner</h1> : <h1 className="text-[100px] italic mb-[5px]">&nbsp;</h1>}
            </td>
            <td  className="flex justify-center mt-[10px]">
              <p>team{team.teamNo}</p>
            </td>
          </tr>
          <tr >
            <td className="flex flex-row ml-[10px] justify-center mt-[3px]">
              <img src={team.player1.url} alt="playerProfile" className="w-[120px] h-[120px] rounded-[16px] border-2 mr-5" />
              <img src={team.player2.url} alt="playerProfile" className="w-[120px] h-[120px] rounded-[16px] border-2" />
            </td>
          </tr>
          <tr>
            <td  className="flex justify-center h-[20px] ">
              {team.isWinner ? <p className="text-emerald-300">맞았습니다!</p> : <p className="text-red-400">틀렸습니다</p>}
            </td>
          </tr>
          <tr>
            <td  className="flex justify-center h-[20px] pt-[10px]">
              {team.isWinner ? <p className="text-emerald-300">+5</p> : <p className="text-red-400">-5</p>}
            </td>
          </tr>
          <tr>
            <td  className="flex justify-center h-[20px] pt-[10px] ">
              {team.time}
            </td>
          </tr>
          <tr>
            <td  className="flex justify-center h-[20px] pt-[10px]">
              {team.storage}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};