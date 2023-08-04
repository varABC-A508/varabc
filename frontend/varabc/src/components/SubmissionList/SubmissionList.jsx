import Submission from "./Submission.jsx";


const SubmissionList = () => {

  const submissionResults = [
    { idx: 0, nickname: 'dp조아', problemTitle: 'abc학교 점심시간', result: '맞았습니다', memory: '71248', time: '348', language:'Python', dateTime: '2023-07-24 14:13' },
    { idx: 1, nickname: 'dp조아', problemTitle: 'abc학교 점심시간이 아주 길면 어떻게 될까? 그냥 다음 줄로 넘어가는 거겠죠', result: '틀렸습니다', memory: '71248', time: '348', language:'Python', dateTime: '2023-07-24 14:13' }, 
    { idx: 2, nickname: 'dp조아', problemTitle: 'abc학교 점심시간', result: '맞았습니다', memory: '71248', time: '348', language:'Python', dateTime: '2023-07-24 14:13' }

  ]

  const headText = "p-3 text-white text-center font-bold"

  const submissions = submissionResults.map((submissionResult) => {
    return <Submission key={submissionResult.idx} result={submissionResult} />
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


