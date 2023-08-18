import { useNavigate } from "react-router-dom";

const ProblemItem = ({problem, index, last, mode}) => {
  let navigate = useNavigate();
  const onProblemClick = () => {

    if (mode==='admin') {

      const postId = problem.problemNo;
      navigate(`/admin/post/${postId}`)
      return;
    }

    sessionStorage.setItem('isPractice', JSON.stringify(true));
    navigate(`/problem/${problem.problemNo}`, {
      state: problem.problemNo
    });
  };
  return (
    <tr className="bg-primary text-white text-[20px]" onClick={onProblemClick}>
      <td className={`${index === last ? 'rounded-bl-[10px]' : ''}`}>
        {problem.problemNo}
      </td>
      <td>{problem.problemLevel}</td>
      <td className="text-[24px] ">{problem.problemTitle}</td>
      <td>{problem.problemSubmitCount}</td>
      <td className={`${index === last ? 'rounded-br-[10px]' : ''}`}>
        {problem.problemCorrectCount}
      </td>
    </tr>
  );
};

export default ProblemItem;