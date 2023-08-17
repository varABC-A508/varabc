
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faMicrophone} from "@fortawesome/free-solid-svg-icons";

import IdeMode from './Select/IdeMode';
import IdeFontSize from './Select/IdeFontSize';
import IdeTheme from './Select/IdeTheme';
import Timer from './Timer';
import { useSelector } from "react-redux";

const IdeNav = () => {
  const isPractice = JSON.parse(sessionStorage.getItem('isPractice'));
  const isPlayerTurn = useSelector((state) => state.ide.isPlayerTurn);
  const openLink = () => {
    window.open('https://docs.python.org/3.12/', '_blank');
    window.open('https://docs.oracle.com/en/java/javase/', '_blank');
  }
    return (
        <div className='w-full bg-primary text-white p-1 flex flex-wrap items-center justify-between'>
          <div className='mt-2'>
            <FontAwesomeIcon className='ml-4 text-white' icon={faBookOpen} onClick={openLink} />
            <FontAwesomeIcon className='ml-4 text-white text-[25px]' icon={faMicrophone} />
          </div>
          <div className="text-[24px]">{ !isPractice && isPlayerTurn ? "나의 턴" : "페어의 턴"}</div>
          <div className='w-70% bg-primary text-white p-1 flex flex-wrap justify-between'>
            {isPractice ? null : <Timer />}
            <IdeMode />
            <IdeFontSize />
            <IdeTheme />
          </div>
        </div>
    );
};

export default IdeNav;