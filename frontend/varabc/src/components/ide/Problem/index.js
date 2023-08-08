import Title from "./Title";
import Content from "./Content";
import { useEffect, useState } from "react";
import axios from "axios";

const Problem = ({problemNo}) => {
  const [problem, setProblem] = useState({});
  console.log(problemNo);
  useEffect(() => {
    axios.get('https://varabc.com:8080/problem/' + problemNo
    ).then((res) => {
      setProblem(res.data);
      console.log(res.data);
    }).catch((err) => {
      alert('문제 데이터 조회 실패');
    });
  }, [problemNo]);
    return(
      <div className="p-4">
        <div className="text-[24px] mt-5 mb-1 font-bold whitespace-pre-wrap">
          {problemNo}. {problem.problemTitle}
        </div>
        <div className="text-[20px] mb-5 font-bold text-base">
          {problem.problemLevel}
        </div>
        <Title text="문제 설명"></Title>
        <Content content={problem.problemContent}></Content>
        <Title text="입력"></Title>
        <Content content={problem.problemInputContent}></Content>
        <Title text="출력"></Title>
        <Content content={problem.problemOutputContent}></Content>
        <div className="flex flex-wrap justify-around">
          <div className="w-1/2">
            <Title text="예제 입력"></Title>
            <Content content={problem.testCaseInputPublicList}></Content>
          </div>
        <div className="w-1/2">
          <Title text="예제 출력"></Title>
          <Content content={problem.testCaseOutputPublicList}></Content>
        </div>
      </div>
    </div>
    );
};

export default Problem;