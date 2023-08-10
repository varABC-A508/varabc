import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import ProblemItem from "./ProblemItem";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const problemPerPage = 10;
  const pageNumber = Math.ceil(problems.length / problemPerPage);
  
  useEffect(() => {
    axios.get('https://varabc.com:8080/problem/getList')
      .then((res) => {
        setProblems(res.data);
      })
      .catch(function (err) {
        alert("문제 리스트 전송 실패\n" + err);
      });
  }, []);

  // 현재 페이지에 해당하는 문제들을 가져오기
  const currentPageLast = currentPage * problemPerPage;
  const currentPageFirst = currentPageLast - problemPerPage;
  const currentProblems = problems.slice(currentPageFirst, currentPageLast);

  const onPageChange = (event, value) => {
    setCurrentPage(value); // 페이지 번호 업데이트
  };

    return (
      <div className="w-full h-screen bg-bg2 bg-cover flex items-center justify-center">
        <div className="flex flex-col items-center">
          <table className="w-[1000px] h-[600px] table-auto divide-y divide-white mt-[20px]">
            <thead className="bg-primary text-white h-[50px]">
              <tr>
                <th className="rounded-tl-[10px] w-[150px]">번호</th>
                <th className="w-[150px]">난이도</th>
                <th className="w-[450px]"> 제목</th>
                <th className="w-[150px]"> 제출</th>
                <th className="w-[150px] rounded-tr-[10px]">성공</th>
              </tr>
            </thead>
            <tbody className="text-center divide-y divide-white">
              {currentProblems.map((problem, index) => {
                return (
                  <ProblemItem
                    key={index}
                    problem={problem}
                    index={index}
                    last={currentProblems.length - 1}
                  />
                );
              })}
            </tbody>
          </table>
          <Pagination
            className="mt-[20px] bg-white"
            count={pageNumber}
            page={currentPage}
            onChange={onPageChange}
          />
        </div>
      </div>
    );
};

export default ProblemList;