import { useSelector } from "react-redux";
import AlgorithmTypeComponent from "./AlgorithmTypeComponent";

const ProblemInfo = () => {

  const { problemNo, problemTitle, problemLevel, problemSubmitCount, problemCorrectCount, problemSource, problemLink, problemRestrictionPython, problemRestrictionJava, problemRestrictionMemory } = useSelector((state) => state.problemPost);


  return (
    <>
      <div className="ps-2 bg-neutral-100 border-s border-t border-neutral-300">
        문제 번호 
      </div>
      <div className="ps-2 col-span-5 border-x border-t border-neutral-300">
        {problemNo}
      </div>
      <div className="ps-2 bg-neutral-100 border-s border-t border-neutral-300">
        문제 제목
      </div>
      <div
        className="ps-2 col-span-5 border-x border-t border-neutral-300"
      >
        {problemTitle}
      </div>
      <div
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        문제 레벨
      </div>
      <div
        className="ps-2 col-span-2 border-s border-t border-neutral-300"
      >
        {problemLevel}
      </div>
      <div
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        문제 출처
      </div>
      <div
        className="ps-2 col-span-2 border-x border-t border-neutral-300"
      >
        {problemSource}
      </div>
      <div
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        알고리즘 종류
      </div>
      <AlgorithmTypeComponent />
      <div
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        문제 링크
      </div>
      <div
        id="problemLink"
        className="ps-2 col-span-5 border-x border-t border-neutral-300"
      >
        {problemLink}
      </div>
      <div className="ps-2 bg-neutral-100 border-s border-t border-neutral-300">
        Python 시간제한
      </div>
      <div
        className="ps-2 border-s border-t border-neutral-300"
      >
        {`${problemRestrictionPython}초`}
      </div>
      <div
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        Java 시간제한
      </div>
      <div
        className="ps-2 border-s border-t border-neutral-300"
      >
        {`${problemRestrictionJava}초`}
      </div>
      <div
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        메모리제한
      </div>
      <div
        id="problemRestrictionMemory"
        className="ps-2 border-x border-t border-neutral-300"
      >
        {`${problemRestrictionMemory}MB`}
      </div>
      <div
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        문제 제출 횟수
      </div>
      <div
        className="ps-2 col-span-2 border-s border-t border-neutral-300"
      >
        {problemSubmitCount}
      </div>
      <div
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        문제 맞은 횟수
      </div>
      <div
        className="ps-2 col-span-2 border-x border-t border-neutral-300"
      >
        {problemCorrectCount}
      </div>
    </>
  );
};

export default ProblemInfo; 