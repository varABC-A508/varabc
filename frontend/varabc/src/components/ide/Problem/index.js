import Title from "./Title";
import Content from "./Content";
import { useEffect, useState } from "react";
import axios from "axios";
import Testcase from "./Testcase";

const Problem = ({problemNo}) => {
  const [problem, setProblem] = useState({});
  useEffect(() => {
    axios.get('https://varabc.com:8080/problem/' + problemNo
    ).then((res) => {
      setProblem(res.data);
    }).catch((err) => {
      alert('문제 데이터 조회 실패:' + err);
    });
  }, [problemNo]);
    return(
      <div className="p-4">
        <div className="text-[24px] mb-1 font-bold whitespace-pre-wrap">
          {problemNo}. {problem.problemTitle}
        </div>
        <div className="text-[20px] mb-5 font-bold">
          {problem.problemLevel}
        </div>
        <Title text="문제 설명"></Title>
        <Content content={problem.problemContent}></Content>
        <Title text="입력"></Title>
        <Content content={problem.problemInputContent}></Content>
        <Title text="출력"></Title>
        <Content content={problem.problemOutputContent}></Content>
        <Testcase inputUrlList={problem.testCaseInputPublicList} outputUrlList={problem.testCaseOutputPublicList} />
      </div>
    );
};

export default Problem;