import BattleSubmitItem from "./BattleSubmitItem.jsx";


const BattleSubmitList = ({submitList}) => {

  const headText = "p-3 text-white text-center font-bold"

  const battleSubmitList = submitList.map((submit, index) => {
    return <BattleSubmitItem key={index} result={submit} />
  })

  return (
    <table className="w-[1000px] m-3 p-3 table-fixed rounded-[10px] bg-[#3C4051] divide-y divide-black">
      <thead>
        <tr className="w-full grid grid-cols-12 rounded-t-[10px] bg-[#323543] ">
          <th className={`col-span-2 ${headText}`}>닉네임</th>
          <th className={`col-span-2 ${headText}`}>결과</th>
          <th className={`${headText}`}>메모리</th>
          <th className={`${headText}`}>시간</th>
          <th className={`${headText}`}>언어</th>
          <th className={`col-span-3 ${headText}`}>제출시간</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-black">
        {battleSubmitList}
      </tbody>
    </table>
  )

}; 
export default BattleSubmitList; 