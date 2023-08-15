import { useSelector } from "react-redux";
import { algorithmTypeIntToString } from "../../../utils/problemUtil";

const AlgorithmTypeComponent = () => {
  const problemAlgorithmType = useSelector(
    (state) => state.problemPost.problemAlgorithmType
  );

  const algorithmString = algorithmTypeIntToString(problemAlgorithmType)

  return (
    <div className="bg-white col-span-5 border-x border-t border-neutral-300 flex justify-start align-center ps-2 gap-x-3">
      { algorithmString }
    </div>
  );
};

export default AlgorithmTypeComponent;