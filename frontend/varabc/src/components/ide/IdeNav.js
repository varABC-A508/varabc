
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleInfo, faBookOpen, faMicrophone} from "@fortawesome/free-solid-svg-icons";

import IdeMode from './Select/IdeMode';
import IdeFontSize from './Select/IdeFontSize';
import IdeTheme from './Select/IdeTheme';
import Timer from './Timer';
import AudioChat from "../common/AudioChat";

const IdeNav = () => {
  const isPractice = JSON.parse(sessionStorage.getItem('isPractice'));
    return (
        <div className='w-full bg-primary text-white p-1 flex flex-wrap justify-between'>
          <div className='mt-2'>
            <FontAwesomeIcon className='ml-4 text-white' icon={faCircleInfo} />
            <FontAwesomeIcon className='ml-4 text-white' icon={faBookOpen} />
            <FontAwesomeIcon className='ml-4 text-white' icon={faMicrophone} />
          </div>
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