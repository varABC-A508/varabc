import { useSelector } from "react-redux";
import algorithmTypes from "../../../utils/problemForm/algorithmTypes";

const AlgorithmTypeComponent = () => {
  const problemAlgorithmType = useSelector(
    (state) => state.problemPost.problemAlgorithmType
  );

  const algorithms = []; 
  for (let i=0; i<problemAlgorithmType.length; i++) {
    if (problemAlgorithmType[i] === "1") {
      algorithms.push(algorithmTypes[i].algoType)
    }
  }

  const algorithmString = algorithms.join(', ');

  return (
    <div className="bg-white col-span-5 border-x border-t border-neutral-300 flex justify-start align-center ps-2 gap-x-3">
      { algorithmString }
    </div>
  );
};

export default AlgorithmTypeComponent;