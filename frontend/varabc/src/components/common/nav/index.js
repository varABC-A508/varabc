import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Login } from "../../../pages/myPage/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { setNickname } from "../../../redux/Reducer/userReducers";
import ProfileImage from "../ProfileImage";
import axios from "axios";
import swal from "sweetalert";

export const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nickname = useSelector((state) => state.user.nickname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function getUserInfo() {
      if (nickname && nickname !== "undefined" && nickname !== "null") {
        try {
          const userToken = localStorage.getItem("access-token");
          if (!userToken) {
            swal("이런", "회원가입부터 해주세요!", "error");
            navigate("/");
            return;
          }

          const response = await axios.get(
            `https://varabc.com:8080/member/getUserInfo`,
            {
              headers: {
                "access-token": userToken,
              },
            }
          );
          console.log(response);

          if (response.status === 200) {
            setUserProfile(response.data.userInfo.memberImage);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    getUserInfo();
    // eslint-disable-next-line
  }, [nickname]);

  const logout = () => {
    // TODO: 최종 빌드 시 localstrage 변경
    localStorage.removeItem("nickname");
    dispatch(setNickname(null));
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  useEffect(() => {
    if (location.pathname === "/battle") {
      setActiveTab("battle");
    } else if (location.pathname === "/problem") {
      setActiveTab("problem");
    } else if (location.pathname === "/tier") {
      setActiveTab("tier");
    } else {
      setActiveTab("");
    }
    
  }, [location.pathname]);

  return (
    <div className="flex flex-wrap flex-row items-center justify-between w-full h-[80px] bg-primaryDark text-white">
      <div className="w-20% pl-10">
        <Link to="/" className="font-bold text-4xl">
          <span>변수명</span>
          <span> abc</span>
        </Link>
      </div>
      <div className="w-[480px] flex flex-row align-center justify-between">
        <Link
          to="/battle"
          className={`font-bold text-2xl ${
            activeTab === "battle" ? "text-point" : ""
          }`}
        >
          코드 배틀
        </Link>
        <Link
          to="/problem"
          className={`font-bold text-2xl ${
            activeTab === "problem" ? "text-point" : ""
          }`}
        >
          문제
        </Link>
        <Link
          to="/tier"
          className={`font-bold text-2xl ${
            activeTab === "tier" ? "text-point" : ""
          }`}
        >
          티어
        </Link>
      </div>
      <div className="w-20% pr-10">
        {nickname === "null" ||
        nickname === null ||
        nickname === undefined ||
        nickname === "" ? (
          <div>
            <button
              onClick={handleOpenModal}
              className="flex items-center justify-center m-[5px] p-0.5 text-[24px] font-bold bg-gradient-to-r from-cyan-500 to-point border-0 rounded-lg select-none whitespace-nowrap"
            >
              <span className="bg-primaryDark hover:bg-gradient-to-r from-cyan-500 to-point px-4 py-1 rounded-lg  transition-all duration-500"> 
                로그인
              </span>
            </button>
            <Login isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        ) : (
          <div>
            <div className="text-2xl flex items-center">
              <div className="me-2" onClick={goToMypage}>
                <ProfileImage size="small" imgLink={userProfile} />
              </div>
              <span className="font-bold">{nickname}</span>
              <span>님!</span>
              <button
                className="m-[15px] text-[24px] font-bold flex items-center justify-center p-0.5 bg-gradient-to-r from-cyan-500 to-point border-0 rounded-lg select-none whitespace-nowrap"
                onClick={logout}
              >
                <span className="bg-primaryDark hover:bg-gradient-to-r from-cyan-500 to-point px-4 py-1 rounded-lg transition-all duration-500">
                  로그아웃
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
