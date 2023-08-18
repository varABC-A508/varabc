import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BattleInfo from "./BattleInfo";
import MoveRoundButton from "../../../../../components/common/Button/MoveRoundButton";
import SubmissionList from "../../../../../components/SubmissionList/SubmissionList";
import axios from "axios";
import swal from 'sweetalert';

export const BattleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const battle = location.state;

  const [noData, setNoData] = useState(true);

  const [battleDetailData, setBattleDetailData] = useState({
    myTeamSubmitList: [
      {
        nickname: "",
        memberExp: 0,
        submitNo: 0,
        competitionResultNo: 0,
        problemNo: 0,
        submitStatus: "",
        submitUsedMemory: 0,
        submitUsedTime: 0,
        submitLanguage: "",
        submitTime: "",
        problemTitle: "",
      },
    ],
    opponentTeamSubmitList: [
      {
        nickname: "",
        memberExp: 0,
        submitNo: 0,
        competitionResultNo: 0,
        problemNo: 0,
        submitStatus: "",
        submitUsedMemory: 0,
        submitUsedTime: 0,
        submitLanguage: "",
        submitTime: "",
        problemTitle: "",
      },
    ],
  });

  const { competitionResultNo } = useParams();
  const battleInfoData = {
    problem: {
      problemSource: battle.problemSource,
      problemLevel: battle.problemLevel,
      problemTitle: battle.problemTitle,
      problemAlgorithmType: "000000000000",
    },
    team1: {
      user1: {
        userName: battle.nicknameT1M1,
        userTier: battle.memberExpT1M1
      },
      user2: {
        userName: battle.nicknameT1M2,
        userTier: battle.memberExpT1M2
      },
    },
    team2: {
      user1: {
        userName: battle.nicknameT2M1,
        userTier: battle.memberExpT2M1
      },
      user2: {
        userName: battle.nicknameT2M2,
        userTier: battle.memberExpT2M2
      },
    },
  };

  useEffect(() => {
    async function getBattleDetail() {
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
          `https://varabc.com:8080/mypage/battleDetail/${competitionResultNo}/${memberNo}`
          //`https://varabc.com:8080/mypage/battleDetail/${competitionResultNo}/36`
        );
        // console.log(response);
        if (response.status === 200) {
          setBattleDetailData(response.data);
          setNoData(false);
        } 
      } catch (e) {
        console.error(e);
      }
    }
    getBattleDetail();
     // eslint-disable-next-line
  }, []);

  const MyTeamNoData = () => {
    return (
      <div className="my-3 w-full">
        <p className="mb-3 text-2xl font-bold text-white">우리팀 코드</p>
        <p className="flex justify-center text-white font-md">
          우리팀 제출 코드가 없습니다!
        </p>
      </div>
    );
  };

  const OpponentTeamNodata = () => {
    return (
      <div className="my-3 w-full">
        <p className="mb-3 text-2xl font-bold text-white">상대팀 코드</p>
        <p className="flex justify-center text-white font-md">
          상대팀 제출 코드가 없습니다!
        </p>
      </div>
    );
  };

  if (noData) {
    return (
      <div className="w-9/12 flex flex-col items-center p-3 mx-auto">
        <BattleInfo battle={battleInfoData} />
        <MyTeamNoData />
        <OpponentTeamNodata />
      </div>
    );
  }

  console.log(battleDetailData.myTeamSubmitList.length)
  console.log(battleDetailData.opponentTeamSubmitList.length)
  return (
    <div className="w-9/12 flex flex-col items-center p-3 mx-auto">
      <BattleInfo battle={battleInfoData} />
      <MoveRoundButton
        to="/mypage/reviews"
        text="배틀 리뷰 보기"
        bgColor="basic"
        btnSize="basic"
      />
      {battleDetailData.myTeamSubmitList.length === 0 ? (
        <MyTeamNoData />
      ) : (
        <div className="my-3 w-full">
          <p className="mb-3 text-2xl font-bold text-white">우리팀 코드</p>
          <SubmissionList
            pagination={false}
            submissions={battleDetailData.myTeamSubmitList}
            mode="battle"
            navigation="battleCode"
          />
        </div>
      )}

      {battleDetailData.opponentTeamSubmitList.length === 0 ? (
        <OpponentTeamNodata />
      ) : (
        <div className="my-3 w-full">
          <p className="mb-3 text-2xl font-bold text-white">상대팀 코드</p>
          <SubmissionList
            pagination={false}
            submissions={battleDetailData.opponentTeamSubmitList}
            mode="battle"
            navigation="battleCode"
          />
        </div>
      )}
    </div>
  );
};
