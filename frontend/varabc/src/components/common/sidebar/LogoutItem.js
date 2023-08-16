import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const LogoutItem = () => {
    const navigate = useNavigate();
    const onLogoutClick = () => {
        navigate("/");
    };
    return (
      <div onClick={onLogoutClick} className="flex items-center mb-[20px] cursor-pointer mt-[180px]">
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className="text-point text-[25px] mr-[20px]"
        />
        <div className="w-full h-[60px] flex items-center justify-start text-white text-[24px] font-bold">
          로그아웃
        </div>
      </div>
    );
}

export default LogoutItem;