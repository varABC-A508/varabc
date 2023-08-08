import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setIsPractice } from '../../../redux/Reducer/ideReducers';

const ProblemItem = ({problem, index, last}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const onProblemClick = () => {
    dispatch(setIsPractice(true));
    navigate(`/problems/${problem.problemNo}`, {
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