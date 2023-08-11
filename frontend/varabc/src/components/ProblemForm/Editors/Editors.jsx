import MyEditor from "./MyEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  setProblemContent,
  setProblemInputContent,
  setProblemOutputContent,
} from "../../../redux/Reducer/problemFormReducers";

const Editors = ({ quillRefContent, quillRefInput, quillRefOutput }) => {
  const dispatch = useDispatch();

  const { problemContent, problemInputContent, problemOutputContent } = useSelector(
    (state) => state.problemForm
  );


  const handleProblemContentChange = (problemContent) => {
    dispatch(setProblemContent(problemContent));
  };

  const handleProblemInputContentChange = (problemInputContent) => {
    dispatch(setProblemInputContent(problemInputContent));
  };

  const handleProblemOutputContentChange = (problemOutputContent) => {
    dispatch(setProblemOutputContent(problemOutputContent));
  };

  return (
    <>
      <div className="ps-2 col-span-6 bg-neutral-100 border-x border-t border-neutral-300">
        문제 내용
      </div>
      <MyEditor
        content={problemContent}
        handleEditorChange={handleProblemContentChange}
        minHeight="500px"
        ref={quillRefContent}
      />
      <div className="ps-2 col-span-6 bg-neutral-100 border-x border-neutral-300">
        입력에 관한 설명
      </div>
      <MyEditor
        content={problemInputContent}
        handleEditorChange={handleProblemInputContentChange}
        minHeight="200px"
        ref={quillRefInput}
      />
      <div className="ps-2 col-span-6 bg-neutral-100 border-x border-neutral-300">
        출력에 관한 설명
      </div>
      <MyEditor
        content={problemOutputContent}
        handleEditorChange={handleProblemOutputContentChange}
        minHeight="200px"
        ref={quillRefOutput}
      />
    </>
  );
};

export default Editors;
