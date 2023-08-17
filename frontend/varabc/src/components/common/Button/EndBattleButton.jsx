import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useSelector } from 'react-redux';

const EndBattleButton = ({ comment }) => {
	const navigate = useNavigate();
	const { roomToken } = useParams();
	const { readability, naming, speed, communication } = useSelector(
		(state) => state.review
	);
	const onButtonClick = (e) => {
		e.preventDefault();
		axios.post(`https://varabc.com:8080/battle/review/${roomToken}`, {
			"reviewTagReadability" : readability,
			"reviewTagNaming": naming,
			"reviewTagSpeed": speed,
			"reviewTagCommunication": communication,
			"reviewReceiveMemberNo": sessionStorage.getItem('teamMateNo'),
			"reviewSendMemberNo": sessionStorage.getItem('memberNo'),
			"reviewContent": comment
		}).then(() => {
			navigate("/");
		}).catch((err) => {
			// TODO: http status에 따른 예외 처리 하기
		});
	}

	return (
		<button
		type="button"
		onClick={onButtonClick}
		className="w-[300px] h-[80px] text-xl bg-red group flex justify-center items-center font-bold rounded-full"
    >
      <span>배틀 완료</span>
      <FontAwesomeIcon
        className={`bg-red text-white flex ml-4`}
        icon={faArrowRightFromBracket}
				/>
    </button>
  );
};
export default EndBattleButton;