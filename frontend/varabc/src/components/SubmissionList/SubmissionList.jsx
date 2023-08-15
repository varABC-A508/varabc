import Submission from "./Submission.jsx";


const SubmissionList = ({submitList}) => {

  const headText = "p-3 text-white text-center font-bold"

  const submissions = submitList.map((submissionResult, index) => {
    return <Submission key={index} result={submissionResult} />
  })


  return (
    <table className="w-[1000px] m-3 p-3 table-fixed rounded-[10px] bg-[#3C4051] divide-y divide-black">
      <thead>
        <tr className="w-full grid grid-cols-12 rounded-t-[10px] bg-[#323543] ">
          <th className={`col-span-4 ${headText}`}>문제</th>
          <th className={`col-span-2 ${headText}`}>결과</th>
          <th className={`${headText}`}>메모리</th>
          <th className={`${headText}`}>시간</th>
          <th className={`${headText}`}>언어</th>
          <th className={`col-span-3 ${headText}`}>제출시간</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-black">
        {submissions}
      </tbody>


    </table>
  )

}; 
export default SubmissionList; 


