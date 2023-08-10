import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../../redux/Reducer/ideReducers';
import { modes } from '../../../utils/ide/modeUtils';

const IdeMode = () => {
  const mode = useSelector((state) => state.ide.mode);
  const dispatch = useDispatch();

  return(
    <div className="flex-wrap flex items-center">
      <label htmlFor="mode" className="block w-[50px] h-[40px] mt-2 mr-1 text-[20px] font-medium text-white dark:text-white">언어</label>
      <select onChange={(e) => dispatch(setMode(e.target.value))} value={mode} id="mode" className="mr-10 w-[90px] h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
        {modes.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};


export default IdeMode;