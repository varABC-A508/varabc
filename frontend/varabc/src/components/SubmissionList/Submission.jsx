const Submission = ({
  result,
  handleSubmissionClick,
  tableMode,
  navigation,
}) => {
  const cellText =
    "p-3 text-white flex justify-center items-center text-center";
  const resultColor =
    result.result === "맞았습니다" ? "text-green" : "text-red";

  const submitStatusMap = {
    1: "맞았습니다",
    2: "시간 초과",
    3: "메모리 초과",
    4: "틀렸습니다",
  };

  return (
    <tr
      className={`grid grid-cols-12 ${
        navigation === "no" ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={handleSubmissionClick}
    >
      <td className={`${tableMode.width[0]} ${cellText}`}>
        {tableMode.columns[0] === "문제"
          ? result.problemTitle
          : result.nickname}
      </td>
      <td className={`${tableMode.width[1]} ${cellText} ${resultColor}`}>
        {typeof result.submitStatus === "number"
          ? submitStatusMap[result.submitStatus]
          : result.submitStatus}
      </td>
      <td className={`${tableMode.width[2]} ${cellText}`}>
        {(result.submitUsedMemory / 1000000).toFixed(2)}MB
      </td>
      <td className={`${tableMode.width[3]} ${cellText}`}>
        {result.submitUsedTime.toFixed(2)}s
      </td>
      <td className={`${tableMode.width[4]} ${cellText}`}>
        {result.submitLanguage}
      </td>
      <td className={`${tableMode.width[5]} ${cellText}`}>
        {result.submitTime.substring(0, 16)}
      </td>
    </tr>
  );
};

export default Submission;
