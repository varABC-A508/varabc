import {useDispatch, useSelector} from 'react-redux';
import { setFontSize } from "../../../redux/Reducer/ideReducers";

const fontSizes = ["14", "16", "18", "20", "22"];

const IdeFontSize = () => {
  const fontSize = useSelector((state) => state.ide.fontSize);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center">
      <label htmlFor="fontSize" className="w-[100px] h-[40px] mt-2 mr-1 block text-[20px] font-medium text-white dark:text-white">글자 크기</label>
      <select onChange={(e) => dispatch(setFontSize(e.target.value))} value={fontSize} id="fontSize" className="mr-10 w-[60px] h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {fontSizes.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default IdeFontSize;