import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Submission from "./Submission.jsx";
import Pagination from "@mui/material/Pagination";
import { submissionExample } from "./submissionExample.jsx";

const SubmissionList = ({
  submissions = submissionExample,
  navigation,
  pagination = true,
  mode = "practice",
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  let tableMode;
  if (mode === "practice") {
    tableMode = {
      width: ["col-span-4", "col-span-2", "col-span-1", "col-span-1", "col-span-1", "col-span-3"],
      columns: ["문제", "결과", "메모리", "시간", "언어", "제출시간"],
    };
  } else if (mode === "battle") {
    tableMode = {
      width: ["col-span-2", "col-span-2", "col-span-2", "col-span-2", "col-span-2", "col-span-2"],
      columns: ["닉네임", '결과', "메모리", "시간", "언어", "제출시간"]
    }
  }

  let submissionPerPage;
  if (pagination) {
    submissionPerPage = 10;
  } else {
    submissionPerPage = submissions.length;
  }

  const pageNumber = Math.ceil(submissions.length / submissionPerPage);

  // 현재 페이지에 해당하는 제출들을 가져오기
  const currentPageLast = currentPage * submissionPerPage;
  const currentPageFirst = currentPageLast - submissionPerPage;
  const currentSubmissions = submissions.slice(
    currentPageFirst,
    currentPageLast
  );

  const onPageChange = (event, value) => {
    setCurrentPage(value); // 페이지 번호 업데이트
  };

  const handleSubmissionClick = (idx) => {
    if (navigation === 'practiceCode') {
      navigate(`/mypage/history/practice/code/${idx}`) 
    } else if (navigation === 'battleCode') {
      navigate(`/mypage/history/battle/code/${idx}`)
    }
  }

  const headText = "p-3 text-white text-center font-bold";

  const submissionsAll = currentSubmissions.map((submissionResult) => {
    return (
      <Submission
        key={submissionResult.submitNo}
        result={submissionResult}
        handleSubmissionClick={()=>{handleSubmissionClick(submissionResult.submitNo)}}
        navigation={navigation}
        tableMode={tableMode}
      />
    );
  });

  return (
    <div className={`flex flex-col items-center mb-3`}>
      <table className="w-full m-3 p-3 table-fixed rounded-[10px] bg-[#3C4051] divide-y divide-black">
        <thead>
          <tr className="w-full grid grid-cols-12 rounded-t-[10px] bg-primaryDark ">
            <th className={`${tableMode.width[0]} ${headText}`}>{tableMode.columns[0]}</th>
            <th className={`${tableMode.width[1]} ${headText}`}>{tableMode.columns[1]}</th>
            <th className={`${tableMode.width[2]} ${headText}`}>{tableMode.columns[2]}</th>
            <th className={`${tableMode.width[3]} ${headText}`}>{tableMode.columns[3]}</th>
            <th className={`${tableMode.width[4]} ${headText}`}>{tableMode.columns[4]}</th>
            <th className={`${tableMode.width[5]} ${headText}`}>{tableMode.columns[5]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black">{submissionsAll}</tbody>
      </table>
      {pagination && (
        <Pagination
          className="mt-[20px] bg-white"
          count={pageNumber}
          page={currentPage}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};
export default SubmissionList;
