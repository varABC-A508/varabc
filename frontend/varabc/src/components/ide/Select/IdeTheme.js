
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../../../redux/Reducer/ideReducers';
import { darkThemes, lightThemes } from '../../../utils/ide/themeUtils';


const IdeTheme = () => {
  const theme = useSelector((state) => state.ide.theme); // 상태 가져오기
  const dispatch = useDispatch();
  return (
    <div className="flex-wrap flex items-center">
      <label htmlFor="theme" className="w-[90px] h-[40px] text-[20px] mt-2 mr-1 block text-white font-medium text-gray-900 dark:text-white">IDE 테마</label>
      <select onChange={(e) => dispatch(setTheme(e.target.value))} value={theme} id="theme" className="mr-4 w-[160px] h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
        <optgroup label="다크 모드">
          {darkThemes.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </optgroup>
        <optgroup label="라이트 모드">
          {lightThemes.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default IdeTheme;