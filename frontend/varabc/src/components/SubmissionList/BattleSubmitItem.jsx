const BattleSubmitItem = ({result}) => {

  const cellText = "p-3 text-white flex justify-center items-center text-center";
  const resultColor = (result.submitStatus === "맞았습니다." ? "text-green" : "text-red");
  
  return (
    <tr className="grid grid-cols-12">
      <td className={`col-span-2 ${cellText}`}>{result.nickname}</td>
      <td className={`col-span-2 ${cellText} ${resultColor}`}>
        {result.submitStatus}
      </td>
      <td className={`${cellText}`}>{result.submitUsedMemory}KB</td>
      <td className={`${cellText}`}>{result.submitUsedTime}ms</td>
      <td className={`${cellText}`}>{result.submitLanguage}</td>
      <td className={`col-span-3 ${cellText}`}>{result.submitTime}</td>
    </tr>
  );
  }; 
  
  export default BattleSubmitItem; 