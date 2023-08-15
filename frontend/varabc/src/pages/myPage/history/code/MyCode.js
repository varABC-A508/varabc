import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProblemBasicInfo from "./ProblemBasicInfo";
import SubmissionList from "../../../../components/SubmissionList/SubmissionList";
import ProblemDetailedInfo from "./ProblemDetailedInfo";
import CodeDetailIDE from "./CodeDetailIDE.js";

import { editImagesInPost } from "../../../../utils/problemUtil";
import axios from "axios";

export const MyCode = ({ mode }) => {
  const navigate = useNavigate();
  const { submitNo } = useParams();
  const [noData, setNoData] = useState(true);
  const [practiceCodeData, setPracticeCodeData] = useState({
    nickname: "",
    memberExp: 0,
    problemTitle: "",
    submitDto: {
      submitNo: 0,
      problemNo: 0,
      memberNo: 0,
      competitionResultNo: 0,
      submitMode: 1,
      submitStatus: 1,
      submitCode: "print('Hello')",
      submitTime: "",
      submitUsedMemory: 0,
      submitUsedTime: 0.0,
      submitLanguage: "java",
    },
  });

  const [problemData, setProblemData] = useState({
    problemNo: 0,
    problemTitle: "abc학교 점심시간",
    problemContent: "",
    problemLevel: "",
    problemSubmitCount: 0,
    problemCorrectCount: 0,
    problemInputContent: "",
    problemOutputContent: "",
    problemSource: "",
    problemAlgorithmType: "000000000000",
    problemImageS3Url: [],
    problemRestritionPython: 0.0,
    problemRestrictionJava: 0.0,
    problemRestrictionMemory: 0,
    testCaseInputList: [],
    testCaseOutputList: [],
  });

  const [problemContent, setProblemContent] = useState("");
  const [problemInputContent, setProblemInputContent] = useState("");
  const [problemOutputContent, setProblemOutputContent] = useState("");

  useEffect(() => {
    async function getCode() {
      const userToken = localStorage.getItem("access-token");
      if (!userToken) {
        alert("회원가입부터 해주세요!");
        navigate("/");
        return;
      }

      try {
        const userResponse = await axios.get(
          `https://varabc.com:8080/member/getUserInfo`,
          {
            headers: {
              "access-token": userToken,
            },
          }
        );

        const memberNo = userResponse.data.userInfo.memberNo;
        const response = await axios.get(
          `https://varabc.com:8080/mypage/submit/code/${memberNo}/${submitNo}`
          //`https://varabc.com:8080/mypage/submit/code/29/${submitNo}`
        );
        console.log(response);
        setPracticeCodeData(response.data);

        const problemResponse = await axios.get(
          `https://varabc.com:8080/problem/${response.data.submitDto.problemNo}`
        );
        console.log(problemResponse);
        
        
        
        if (response.status === 200 && problemResponse.status === 200) {
          const [problemContent, problemInputContent, problemOutputContent ]= editImagesInPost(problemResponse.data.problemContent, problemResponse.data.problemInputContent,problemResponse.data.problemOutputContent, problemResponse.data.problemImageS3Url)
          setProblemData(problemResponse.data);
          setProblemContent(problemContent)
          setProblemInputContent(problemInputContent)
          setProblemOutputContent(problemOutputContent)
          setNoData(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getCode();
    // eslint-disable-next-line
  }, []);

  const submissions = [
    {
      submitNo: practiceCodeData.submitDto.submitNo,
      problemTitle: practiceCodeData.problemTitle,
      submitStatus: practiceCodeData.submitDto.submitStatus,
      submitUsedMemory: practiceCodeData.submitDto.submitUsedMemory,
      submitUsedTime: practiceCodeData.submitDto.submitUsedTime,
      submitLanguage: practiceCodeData.submitDto.submitLanguage,
      submitTime: practiceCodeData.submitDto.submitTime,
    },
  ];

  if (noData) {
    return (
      <div className="w-full flex flex-col items-center mx-auto p-3">
        <h1 className="mb-4 w-9/12 text-4xl text-white font-bold">내 코드</h1>
        <div className="w-9/12 mb-4">
          <p className="flex justify-center text-white font-md">
            해당 제출 코드의 상세내역이 존재하지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mx-auto p-3">
      <h1 className="mb-4 w-9/12 text-4xl text-white font-bold">내 코드</h1>
      <div className="w-9/12">
        <ProblemBasicInfo problemData={problemData} />
        <SubmissionList
          submissions={submissions}
          pagination={false}
          navigation="no"
          mode={mode}
        />
        <ProblemDetailedInfo problemData={problemData} problemContent={problemContent} problemInputContent={problemInputContent} problemOutputContent={problemOutputContent}/>
        <CodeDetailIDE
          code={practiceCodeData.submitDto.submitCode}
          language={practiceCodeData.submitDto.submitLanguage}
        />
      </div>
    </div>
  );
};
