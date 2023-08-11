import { Link, useLocation, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MoveRoundButton from "../../components/common/Button/MoveRoundButton";
import IconDescription from "./IconDescription";
import IconDescriptionReverse from "./IconDescriptionReverse";

import ideImage from '../../img/ide.PNG';
import logo from '../../img/varABC_logo.png';
import sub2 from '../../img/sub2.png';
import sub3 from '../../img/sub3.png';
import sub4 from '../../img/sub4.png';
import sub5 from '../../img/sub5.png';

import NicknameModal from "../../components/login/NicknameModal";


export const Home = () => {
  console.log('>>>>홈');

  // 백엔드 서버에서 token과 nickname이 옴(nickname 초기값은 null > 설정 창을 띄우고 저장 후 다시 백엔드로 보내주기) > 저장
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const receivedAccessToken = queryParams.get('access-token');
  const receivedRefreshToken = queryParams.get('refresh-token');
  const receivedNickname = queryParams.get('memberNickname');
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(receivedAccessToken);
  const [refreshToken, setRefreshToken] = useState(receivedRefreshToken);
  const [nickname, setNickname] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (receivedAccessToken) {
      setAccessToken(receivedAccessToken);
      setRefreshToken(receivedRefreshToken);
      sessionStorage.setItem('access-token', accessToken);
      sessionStorage.setItem('refresh-token', refreshToken);
      console.log(accessToken);
      console.log(refreshToken);

      if (nickname) {
        setNickname(nickname);     
        localStorage.setItem('nickname', nickname);
        console.log(nickname);
        navigate('/');
      } else {
        // 닉네임이 없으면 모달 열기
        setModalOpen(true);
        navigate('/');
        console.log('>>>>>>>모달');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedAccessToken, receivedNickname]);

  const handleModalSave = (newNickname) => {
    console.log(">>>>저장했대");
    setNickname(newNickname);
    SessionStorage.setItem('access-token', accessToken);
    localStorage.setItem('nickname', newNickname);

    // accessToken과 nickname을 이용하여 백엔드에 요청을 보낼 수 있음
    if (localStorage.getItem('nickname')) {
      console.log('>>>>>요청 보내라');
      console.log(accessToken);
      const api = 'https://www.varabc.com:8080/member/changeNickname';
      const requestBody = {
        memberNickname: newNickname,
      };

      axios.post(api, requestBody, {
        headers: {
          'access-token': accessToken,
        }
      })
      .then(response => {
        console.log('>>>>>>>>요청 성공', response);
        setModalOpen(false);
        navigate('/');
        window.location.reload();
      })
      .catch(error => {
        console.log('>>>>에러 응답', error.response.data);
        console.log('>>>>에러 상태 코드', error.response.status);
      });
    }
  }

  return (
    <div>
      <div className="w-screen h-screen flex items-end p-20 bg-bg1 bg-cover">
        <div className="flex justify-between items-center w-full pb-20">
          <div className="h-fit">
            <div className="text-4xl text-white font-bold mb-5">변수명</div>
            <div>
              <img
                className="w-[480px] h-[225px]"
                alt="변수명ABC"
                src={logo}
              />
            </div>
          </div>
          <div className="h-fit">
            <div className="text-white text-4xl mb-10 font-bold">
              알고리즘 문제들을 짝과 함께 풀어보세요!
            </div>
            <div>
              <div className="text-white text-2xl mb-3">
                같이 풀 짝이 없으시다구요? 걱정마세요!
              </div>
              <div className="text-white text-2xl mb-3">
                변수명 abc는 랜덤 매칭을 통한 코드 배틀도 지원합니다.
              </div>
              <div className="text-white text-2xl mb-3">
                많은 사람들과 페어 코딩을 해보면서 코드 가독성을 높여보세요!
              </div>
            </div>
            <div className="flex flex-between mt-12">
              <Link
                to="/battle"
                className="text-point font-bold text-3xl mr-10"
              >
                코드 배틀 하기 {<FontAwesomeIcon icon={faArrowRight} />}
              </Link>
              <Link
                to="/problem"
                className="text-point font-bold text-3xl mr-10"
              >
                문제 보러가기 {<FontAwesomeIcon icon={faArrowRight} />}
              </Link>
              <Link to="/tier" className="text-point font-bold text-3xl">
                티어 보러가기 {<FontAwesomeIcon icon={faArrowRight} />}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen flex items-center justify-between pl-20 pr-20 bg-bg2 bg-cover">
        <div className="text-white">
          <img src={ideImage} alt="변수명abc_ide" className="w-[512px] h-[421px]" />
        </div>
        <div className="flex flex-col w-[820px] justify-center">
          <div className="flex flex-col justify-center mb-10 h-[152px]">
            <div className="text-[64px] text-white font-bold flex justify-center">짝과 함께하는</div>
            <div className="text-[64px] text-white font-bold flex justify-center">
              2 vs 2 코딩 배틀
            </div>
          </div>
          <div className="mb-10">
            <div className="text-white text-[32px]">
              변수명 abc는 짝과 함께 알고리즘 문제를 풀어
            </div>
            <div className="text-white text-[32px]">
              협업을 위한 코드 가독성 향상을 연습하는 사이트입니다!
            </div>
          </div>
          <div className="flex justify-center">
            <MoveRoundButton to="/battle" text="코드 배틀 하기" bgColor="point" btnSize="big" />
          </div>
        </div>
      </div>
      <div className="w-screen h-screen flex bg-bg2 bg-cover pl-20 pr-20">
        <div className="w-full flex items-center justify-between">
          <div>
            <img src={sub2} alt="협업" className="w-[600px] h-[600px]" />
          </div>
          <div className="flex flex-col justify-between p-10 bg-white rounded-[20px] w-[560px] h-[600px]">
            <IconDescription url={sub3} alt="알고리즘" descTop="친구와 함께" descBottom="알고리즘 문제를 풀어요" />
            <IconDescriptionReverse url={sub4} alt="협업" descTop="협업을 위해" descBottom="좀 더 좋은 코드를 작성해요" />
            <IconDescription url={sub5} alt="리뷰" descTop="리뷰를 통해" descBottom="내 협업 스킬을 확인해요" />
          </div>
        </div>
      </div>
      <NicknameModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
      />
    </div>
  );
};