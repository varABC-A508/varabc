import { algorithmTypeIntToString } from "../../../../utils/problemUtil";

const ProblemBasicInfo = ({ problemData }) => {

  return (
    <div className="flex flex-col items-center">
      <div className="text-white mb-2">{problemData.problemLevel}</div>
      <div className="text-white text-2xl font-bold mb-2">
        {problemData.problemTitle}
      </div>
      <div className="text-white mb-2">
        {algorithmTypeIntToString(problemData.problemAlgorithmType)}
      </div>
    </div>
  );
};

export default ProblemBasicInfo;
