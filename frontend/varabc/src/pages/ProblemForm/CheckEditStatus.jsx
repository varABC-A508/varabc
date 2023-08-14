import { useSelector, useDispatch } from "react-redux";
import {
  setProblemUpdate,
  setProblemContentUpdate,
  setTestCaseUpdate,
} from '../../redux/Reducer/problemFormReducers';

const CheckEditStatus = () => {
  const dispatch = useDispatch();

  const problemUpdate = useSelector(
    (state) => state.problemForm.problemUpdate
  );
  const problemContentUpdate = useSelector(
    (state) => state.problemForm.problemContentUpdate
  );
  const testCaseUpdate = useSelector(
    (state) => state.problemForm.testCaseUpdate
  );

  const handleProblemUpdateChange = () => {
    dispatch(setProblemUpdate(!problemUpdate));
  };

  const handleProblemContentUpdateChange = () => {
    dispatch(setProblemContentUpdate(!problemContentUpdate));
  };

  const handleTestCaseUpdateChange = () => {
    dispatch(setTestCaseUpdate(!testCaseUpdate));
  };

  return (
    <>
      <label
        htmlFor="checkEditStatus"
        className="ps-2 bg-neutral-100 border-s border-t border-neutral-300"
      >
        수정 여부 체크
      </label>
      <div className="bg-white col-span-5 border-x border-t border-neutral-300 flex justify-start align-center ps-2 gap-x-3">
        <label>
          <input
            type="checkbox"
            checked={problemUpdate}
            onChange={handleProblemUpdateChange}
            className="me-1"
            id="problemUpdate"
            name="problemUpdate"
            value="true"
          />
          문제 정보 수정
        </label>

        <label>
          <input
            type="checkbox"
            checked={problemContentUpdate}
            onChange={handleProblemContentUpdateChange}
            className="me-1"
            id="problemContentUpdate"
            name="problemContentUpdate"
            value="true"
          />
          문제 내용 수정
        </label>

        <label>
          <input
            type="checkbox"
            checked={testCaseUpdate}
            onChange={handleTestCaseUpdateChange}
            className="me-1"
            id="testCaseUpdate"
            name="testCaseUpdate"
            value="true"
          />
          테스트케이스 수정
        </label>
      </div>
    </>
  );
};

export default CheckEditStatus;
