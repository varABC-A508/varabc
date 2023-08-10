import { useNavigate } from "react-router-dom";

const ProblemItem = ({problem, index, last}) => {
  let navigate = useNavigate();
  const onProblemClick = () => {
    if(!localStorage.getItem('isPractice')){
      localStorage.setItem('isPractice', JSON.stringify(true));
    }
    navigate(`/problem/${problem.problemNo}`, {
      state: problem.problemNo
    });
  };
  return (
    <tr className="bg-primary text-white" onClick={onProblemClick}>
      <td className={`${index === last ? 'rounded-bl-[10px]' : ''}`}>
        {problem.problemNo}
      </td>
      <td>{problem.problemLevel}</td>
      <td>{problem.problemTitle}</td>
      <td>{problem.problemSubmitCount}</td>
      <td className={`${index === last ? 'rounded-br-[10px]' : ''}`}>
        {problem.problemCorrectCount}
      </td>
    </tr>
  );
};

export default ProblemItem;