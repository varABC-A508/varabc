import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubmissionList from "../../../components/SubmissionList/SubmissionList";

import axios from "axios";
import swal from 'sweetalert';

const PracticeHistory = () => {
  const navigate = useNavigate();
  const [noData, setNoData] = useState(true);
  const [practiceHistoryData, setPracticeHistoryData] = useState([
    {
      submitNo: 0,
      competitionResultNo: 0,
      problemNo: 0,
      submitStatus: "",
      submitUsedMemory: 0,
      submitUsedTime: 0.0,
      submitLanguage: "",
      submitTime: "",
    },
  ]);

  useEffect(() => {
    async function getPracticeHistory() {
      const userToken = localStorage.getItem("access-token");
      if (!userToken) {
        swal ( "이런" ,  "회원가입부터 해주세요!" ,  "error" );
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
          //`https://varabc.com:8080/mypage/submit/29/1`
          `https://varabc.com:8080/mypage/submit/${memberNo}/1`
        );
        // console.log(response);

        if (response.status === 200) {
          const data = response.data;
          setPracticeHistoryData(data);
          setNoData(false);
        }
      } catch (e) {
        console.error(e);
      }
    }

    getPracticeHistory();
    // eslint-disable-next-line
  }, []);

  if (noData) {
    return (
      <div className="flex justify-center text-white text-lg">
        아직 제출한 코드가 없습니다!
      </div>
    );
  }

  return (
    <div>
      <SubmissionList
        navigation="practiceCode"
        submissions={practiceHistoryData}
      />
    </div>
  );
};

export default PracticeHistory;
