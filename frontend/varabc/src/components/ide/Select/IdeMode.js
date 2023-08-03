import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../../redux/Reducer/ideReducers';
import { modes } from '../../../utils/ide/modeUtils';

const IdeMode = () => {
  const mode = useSelector((state) => state.ide.mode);
  const dispatch = useDispatch();

  return(
    <div className="flex-wrap flex items-center">
      <label htmlFor="mode" className="block h-6 mt-2 mr-1 text-xs font-medium text-gray-900 dark:text-white">언어</label>
      <select onChange={(e) => dispatch(setMode(e.target.value))} value={mode} id="mode" className="mr-4 h-6 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
        {modes.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};


export default IdeMode;