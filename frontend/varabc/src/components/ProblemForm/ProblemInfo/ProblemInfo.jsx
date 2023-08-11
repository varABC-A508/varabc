import { useDispatch, useSelector } from "react-redux";
import {
  setProblemTitle,
  setProblemLevel,
  setProblemSource,
  setProblemLink,
  setProblemRestrictionTimePython,
  setProblemRestrictionTimeJava,
  setProblemRestrictionMemory,
} from "../../../redux/Reducer/problemFormReducers";
import AlgorithmTypeCheckboxes from "./AlgorithmTypeCheckboxes";


const ProblemInfo = () => {
  const dispatch = useDispatch();

  const { problemTitle, problemLevel, problemSource, problemLink, problemRestrictionTimePython, problemRestrictionTimeJava,problemRestrictionMemory} = useSelector((state) => state.problemForm);
 

  const handleTitleChange = (e) => {
    dispatch(setProblemTitle(e.target.value));
  };

  const handleLevelChange = (e) => {
    dispatch(setProblemLevel(e.target.value));
  };

  const handleSourceChange = (e) => {
    dispatch(setProblemSource(e.target.value));
  };

  const handleLinkChange = (e) => {
    dispatch(setProblemLink(e.target.value));
  };

  const handlePyTimeChange = (e) => {
    dispatch(setProblemRestrictionTimePython(e.target.value));
  };

  const handleJavaTimeChange = (e) => {
    dispatch(setProblemRestrictionTimeJava(e.target.value));
  };

  const handleMemoryChange = (e) => {
    dispatch(setProblemRestrictionMemory(e.target.value));
  };

  return (
    <>
      <label
        htmlFor="problemTitle"
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        문제 제목
      </label>
      <input
        id="problemTitle"
        className="ps-2 col-span-5 border-x border-t border-neutral-300"
        type="text"
        value={problemTitle}
        onChange={handleTitleChange}
      />

      <label
        htmlFor="problemLevel"
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        문제 레벨
      </label>
      <input
        id="problemLevel"
        className="ps-2 col-span-2 border-s border-t border-neutral-300"
        type="text"
        value={problemLevel}
        onChange={handleLevelChange}
      />

      <label
        htmlFor="problemSource"
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        문제 출처
      </label>
      <input
        id="problemSource"
        className="ps-2 col-span-2 border-x border-t border-neutral-300"
        type="text"
        value={problemSource}
        onChange={handleSourceChange}
      />
      <label
        htmlFor="algorithmType"
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        알고리즘 종류
      </label>
      <AlgorithmTypeCheckboxes />
      <label
        htmlFor="problemLink"
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        문제 링크
      </label>
      <input
        id="problemLink"
        className="ps-2 col-span-5 border-x border-t border-neutral-300"
        type="text"
        value={problemLink}
        onChange={handleLinkChange}
      />
      <label
        htmlFor="problemRestrictionTimePython"
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        Python 시간제한(초)
      </label>
      <input
        type="number"
        step="0.01"
        id="problemRestrictionTimePython"
        className="ps-2 border-s border-t border-neutral-300"
        value={problemRestrictionTimePython}
        onChange={handlePyTimeChange}
      />
      <label
        htmlFor="problemRestrictionTimeJava"
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        Java 시간제한(초)
      </label>
      <input
        type="number"
        step="0.01"
        id="problemRestrictionTimeJava"
        className="ps-2 border-s border-t border-neutral-300"
        value={problemRestrictionTimeJava}
        onChange={handleJavaTimeChange}
      />
      <label
        htmlFor="problemRestrictionMemory"
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        메모리제한(MB)
      </label>
      <input
        type="number"
        id="problemRestrictionMemory"
        className="ps-2 border-x border-t border-neutral-300"
        value={problemRestrictionMemory}
        onChange={handleMemoryChange}
      />
    </>
  );
};

export default ProblemInfo;
