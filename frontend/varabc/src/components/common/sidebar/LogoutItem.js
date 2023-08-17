import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNickname } from "../../../redux/Reducer/userReducers";


const LogoutItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    localStorage.removeItem("nickname");
    dispatch(setNickname(null));
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    navigate("/");
  };
  return (
    <div
      onClick={onLogoutClick}
      className="flex items-center mb-[20px] cursor-pointer mt-[180px]"
    >
      <FontAwesomeIcon
        icon={faArrowRightFromBracket}
        className="text-point text-[25px] mr-[20px]"
      />
      <div className="w-full h-[60px] flex items-center justify-start text-white text-[24px] font-bold">
        로그아웃
      </div>
    </div>
  );
};

export default LogoutItem;
