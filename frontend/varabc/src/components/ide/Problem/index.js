import Title from "./Title";
import Content from "./Content";
import { useEffect, useState } from "react";
import axios from "axios";
import Testcase from "./Testcase";
import { editImagesInPost } from "../../../utils/problemUtil";
import swal from 'sweetalert';

const Problem = ({ problemNo }) => {
  const [problem, setProblem] = useState({});
  const [problemContent, setProblemContent] = useState("");
  const [problemInputContent, setProblemInputContent] = useState("");
  const [problemOutputContent, setProblemOutputContent] = useState("");

  useEffect(() => {
    axios
      .get("https://varabc.com:8080/problem/" + problemNo)
      .then((res) => {
        const [problemContent, problemInputContent, problemOutputContent] = editImagesInPost(res.data.problemContent, res.data.problemInputContent, res.data.problemOutputContent, res.data.problemImageS3Url)
        setProblem(res.data);
        setProblemContent(problemContent)
        setProblemInputContent(problemInputContent)
        setProblemOutputContent(problemOutputContent)

      })
      .catch((err) => {
        swal("이런", "문제 데이터 조회 실패!", "error");
      });
  }, [problemNo]);


  return (
    <div className="p-4 text-white bg-primaryDark h-screen">
      <div className="text-[24px] mb-1 font-bold whitespace-pre-wrap">
        {problemNo}. {problem.problemTitle}
      </div>
      <div className="text-[16px] text-white ms-3 mb-1 font-bold">{`${problem.problemSource} ${problem.problemLevel}`}</div>
      <Title text="문제 설명"></Title>
      <Content content={problemContent}></Content>
      <Title text="입력"></Title>
      <Content content={problemInputContent}></Content>
      <Title text="출력"></Title>
      <Content content={problemOutputContent}></Content>
      <Testcase
        inputUrlList={problem.testCaseInputList}
        outputUrlList={problem.testCaseOutputList}
      />
    </div>
  );
};

export default Problem;
