
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleInfo, faBookOpen, faMicrophone} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux/es/hooks/useSelector";

import IdeMode from './Select/IdeMode';
import IdeFontSize from './Select/IdeFontSize';
import IdeTheme from './Select/IdeTheme';
import Timer from './Timer';

const IdeNav = () => {
  const isPractice = useSelector((state) => state.ide.isPractice);
    return (
        <div className='w-full bg-white p-1 flex flex-wrap justify-between'>
          <div className='mt-2'>
            <FontAwesomeIcon className='ml-4 text-gray-700' icon={faCircleInfo} />
            <FontAwesomeIcon className='ml-4 text-gray-700' icon={faBookOpen} />
            <FontAwesomeIcon className='ml-4 text-gray-700' icon={faMicrophone} />
          </div>
          <div className='w-70% bg-white p-1 flex flex-wrap justify-between'>
            {isPractice ? null : <Timer />}
            <IdeMode />
            <IdeFontSize />
            <IdeTheme />
          </div>
        </div>
    );
};

export default IdeNav;