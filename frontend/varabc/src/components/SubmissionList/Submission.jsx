const Submission = ({result}) => {

  const cellText = "p-3 text-white flex justify-center items-center text-center"
  const resultColor = result.result === "맞았습니다" ? "text-green-500" : "text-red-500"


  return (
    <tr className="grid grid-cols-12">
      <td className={`col-span-4 ${cellText}`}>{result.problemTitle}</td>
      <td className={`col-span-2 ${cellText} ${resultColor}`}>{result.result}</td>
      <td className={`${cellText}`}>{result.memory}KB</td>
      <td className={`${cellText}`}>{result.time}ms</td>
      <td className={`${cellText}`}>{result.language}</td>
      <td className={`col-span-3 ${cellText}`}>{result.dateTime}</td>
    </tr>
  )



}; 

export default Submission; 