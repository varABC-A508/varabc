import { Link, useLocation, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MoveRoundButton from "../../components/common/Button/MoveRoundButton";
import IconDescription from "./IconDescription";
import IconDescriptionReverse from "./IconDescriptionReverse";

import AceEditor from "react-ace";
import logo from '../../img/varABC_logo.png';
import sub2 from '../../img/sub2.png';
import sub3 from '../../img/sub3.png';
import sub4 from '../../img/sub4.png';
import sub5 from '../../img/sub5.png';

import NicknameModal from "../../components/login/NicknameModal";

import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from "../../redux/Reducer/userReducers";


export const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const receivedAccessToken = queryParams.get('access-token');
  const receivedRefreshToken = queryParams.get('refresh-token');
  const receivedNickname = queryParams.get('memberNickname');
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const nickname = useSelector((state) => state.user.nickname);

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (receivedAccessToken) {
      localStorage.setItem('access-token', receivedAccessToken);
      localStorage.setItem('refresh-token', receivedRefreshToken);

      if (receivedNickname !== null && receivedNickname.trim() !== 'undefined' && receivedNickname.trim().length > 0) {
        dispatch(setNickname(receivedNickname.trim()));
        localStorage.setItem('nickname', receivedNickname.trim());
      } else {
        // 닉네임이 없으면 모달 열기
        setModalOpen(true);
      }
    } else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [receivedAccessToken]);

  useEffect(() => {
    localStorage.setItem('nickname', nickname);
    navigate('/');
    // eslint-disable-next-line
  }, [nickname]);

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
          <AceEditor
            mode="python"
            value={`\n짝과 함께하는\n2 VS 2 코딩배틀\n여기에 코드를 입력해보세요!`}
            theme="monokai"
            fontSize={18}
            editorProps={{ $blockScrolling: false }}
            tabSize={2}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            style={{
              width: "600px",
              height: "700px",
            }}
          />
        </div>
        <div className="flex flex-col w-[820px] justify-center">
          <div className="flex flex-col justify-center mb-10 h-[152px]">
            <div className="text-[60px] text-white font-bold flex justify-center">짝과 함께하는</div>
            <div className="text-[60px] text-white font-bold flex justify-center">
              2 vs 2 코딩 배틀
            </div>
          </div>
          <div className="mb-10 ml-[100px]">
            <div className="text-white text-[25px]">
              변수명 abc는 짝과 함께 알고리즘 문제를 풀어
            </div>
            <div className="text-white text-[25px]">
              협업을 위한 코드 가독성 향상을 연습하는 사이트입니다!
            </div>
          </div>
          <div className="flex justify-center">
            <MoveRoundButton to="/battle" text="코드 배틀 하기" bgColor="point" btnSize="big" />
          </div>
        </div>
      </div>
      <div className="w-screen h-screen flex bg-bg2 bg-cover pl-20 pr-20">
        <div className="w-full flex items-center ">
          <div>
            <img src={sub2} alt="협업" className="w-[600px] h-[600px]" />
          </div>
          <div className="flex flex-col justify-between text-[#f1f5f9] text-[25px] ml-[200px] ">
            <div className="flex flex-row m-[5px] ml-[130px] mb-[50px]">
              <IconDescription url={sub3} alt="알고리즘" />
              <div className="flex flex-col m-[3px] mt-[55px]">
                <p>친구와 함께</p>
                <p>알고리즘 문제를 풀어요</p>
              </div>
            </div>
            <div className="flex flex-row m-[5px] mb-[50px] ">
              <IconDescriptionReverse url={sub4} alt="협업" />
              <div className="flex flex-col m-[3px] mt-[55px]">
                <p>협업을 위해</p>
                <p>좀 더 좋은 코드를 작성해요</p>
              </div>
            </div>
            <div className="flex flex-row m-[5px] ml-[130px]">
              <IconDescription url={sub5} alt="리뷰" />
              <div className="flex flex-col m-[3px] mt-[55px]">
                <p>리뷰를 통해</p>
                <p>내 협업 스킬을 확인해요</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NicknameModal
        isOpen={modalOpen}
        onClose={handleClose}
      />
    </div>
  );
}; 