import { useDispatch, useSelector } from "react-redux";
import { setProblemAlgorithmType } from "../../../redux/Reducer/problemFormReducers";

import AlgorithmTypeCheckbox from "./AlgorithmTypeCheckbox";
import algorithmTypes from "../../../utils/problemForm/algorithmTypes";

const AlgorithmTypeCheckboxes = () => {

  const dispatch = useDispatch();
  const problemAlgorithmType = useSelector(
    (state) => state.problemForm.problemAlgorithmType
  );

  const handleChange = (index) => {
    const changedDigit = problemAlgorithmType[index] === "0" ? "1" : "0";
    const newProblemAlgorithmType =
      problemAlgorithmType.slice(0, index) +
      changedDigit +
      problemAlgorithmType.slice(index + 1);
    dispatch(setProblemAlgorithmType(newProblemAlgorithmType));
  };

  const checkboxes = algorithmTypes.map((algoType) => {
    return (
      <AlgorithmTypeCheckbox
        key={algoType.idx}
        idx={algoType.idx}
        children={algoType.algoType}
        checked={problemAlgorithmType[algoType.idx] === "1" ? true : false}
        onCheckChange={() => handleChange(algoType.idx)}
      />
    );
  });

  return (
    <div className="bg-white col-span-5 border-x border-t border-neutral-300 flex flex-wrap justify-start align-center ps-2 gap-x-3">
      {checkboxes}
    </div>
  );
};

export default AlgorithmTypeCheckboxes;
