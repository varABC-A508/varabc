// react hook
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//redux
import { setProblemData } from "../../redux/Actions/problemFormActions";

//subcomponents
import ProblemInfo from "./ProblemInfo/ProblemInfo.jsx";
import Editors from "./Editors/Editors.jsx";
import FileUploads from "./FileUploads/FileUploads.jsx";
import CheckEditStatus from "./CheckEditStatus";

// util 및 기타
import { extractImages } from "../../utils/problemForm/imageUtil.jsx";
import axios from "axios";

const ProblemForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // edit 모드일 경우
  const { postId } = useParams();

  // quill editor 대한 ref
  const quillRefContent = useRef();
  const quillRefInput = useRef();
  const quillRefOutput = useRef();

  // redux
  const {
    imageURLs,
    problemUpdate,
    problemContentUpdate,
    testCaseUpdate,
    ...problemData
  } = useSelector((state) => state.problemForm);
  const { isAdmin } = useSelector((state) => state.admin);

  // useState
  // 테스트케이스
  const [testCaseInputPublicList, setTestcaseInputPublicList] = useState([]);
  const [testCaseOutputPublicList, setTestcaseOutputPublicList] = useState([]);
  const [testCaseInputPrivateList, setTestcaseInputPrivateList] = useState([]);
  const [testCaseOutputPrivateList, setTestcaseOutputPrivateList] = useState(
    []
  );

  // 모드 (작성, 수정)
  const [mode, setMode] = useState("create");
  const [apiUrl, setApiUrl] = useState("https://varabc.com:8080/problem/");

  // form의 각 input field에 대한 onChange 함수

  const handlePublicInputChange = (e) => {
    const files = e.target.files;
    setTestcaseInputPublicList(files);
  };

  const handlePublicOutputChange = (e) => {
    const files = e.target.files;
    setTestcaseOutputPublicList(files);
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    setTestcaseInputPrivateList(files);
  };

  const handleOutputChange = (e) => {
    const files = e.target.files;
    setTestcaseOutputPrivateList(files);
  };

  const files = [
    testCaseInputPublicList,
    testCaseOutputPublicList,
    testCaseInputPrivateList,
    testCaseOutputPrivateList,
  ];

  const handleIOChange = [
    handlePublicInputChange,
    handlePublicOutputChange,
    handleInputChange,
    handleOutputChange,
  ];

  // useEffect

  //admin 확인 (임시)
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  });

  useEffect(() => {
    return () => {
      for (const url of imageURLs) {
        URL.revokeObjectURL(url);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // post create/edit mode
  useEffect(() => {
    if (location.pathname.startsWith("/admin/edit")) {
      setMode("edit");
      setApiUrl(`https://varabc.com:8080/problem/${postId}/update`);

      const { data } = location.state || {};

      const {
        inputPublic,
        outputPublic,
        inputPrivate,
        outputPrivate,
        ...problemUpdateData
      } = data;

      dispatch(setProblemData(problemUpdateData));
      setTestcaseInputPublicList(inputPublic);
      setTestcaseOutputPublicList(outputPublic);
      setTestcaseInputPrivateList(inputPrivate);
      setTestcaseOutputPrivateList(outputPrivate);
    } else {
      setMode("create");
    }
  }, [location.pathname]);

  // form 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 필드에 공백이 남아있을 경우 alert 후 return
    if (
      Object.values(problemData).some(
        (v) => typeof v === "string" && v.trim() === ""
      )
    ) {
      alert("양식을 모두 채워주세요.");
      return;
    }

    const formData = new FormData();

    // 각 input field 내용 append
    for (const p in problemData) {
      formData.append(p, problemData[p]);
    }

    const files = {
      testCaseInputPublicList,
      testCaseOutputPublicList,
      testCaseInputPrivateList,
      testCaseOutputPrivateList,
    };

    for (const filename in files) {
      if (files[filename].length !== 0) {
        for (let i = 0; i < files[filename].length; i++) {
          formData.append(`${filename}`, files[filename][i]);
        }
      }
    }

    const mainImages = await extractImages(
      quillRefContent,
      `problemContentImage`
    );
    const inputImages = await extractImages(
      quillRefInput,
      `problemInputContentImage`
    );
    const outputImages = await extractImages(
      quillRefOutput,
      `problemOutputContentImage`
    );

    const postImages = [mainImages, inputImages, outputImages];

    for (const imageFiles of postImages) {
      if (imageFiles) {
        for (const imageFile of imageFiles) {
          formData.append("problemImageList", imageFile[1], imageFile[0]);
        }
      }
    }

    if (mode === "edit") {
      formData.append("problemUpdate", problemUpdate);
      formData.append("testCaseUpdate", testCaseUpdate);
      formData.append("problemContentUpdate", problemContentUpdate);
    }

    // formData 내용 확인
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    // axios POST request
    try {
      const response = await axios({
        method: "post",
        url: apiUrl,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from server:", response.data);

      if (mode === "edit") {
        navigate(`admin/post/${postId}`);
      }
    } catch (error) {
      console.error(`Error sending data: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center m-3 p-3">
      <h1 className=" mb-4 w-3/5 text-4xl text-white font-bold">
        {`알고리즘 문제 ${mode === "create" ? "등록" : "수정"}`}
      </h1>
      <form onSubmit={handleSubmit} className="w-3/5">
        <div className="grid grid-cols-6">
          {mode === "edit" && <CheckEditStatus />}
          <ProblemInfo />
          <Editors
            quillRefContent={quillRefContent}
            quillRefInput={quillRefInput}
            quillRefOutput={quillRefOutput}
          />
          <FileUploads
            files={files}
            handleIOChange={handleIOChange}
            mode={mode}
          />
        </div>
        <div className="flex justify-end bg-transparent">
          <button
            type="button"
            className="bg-rose-400 p-3 me-2"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          <button type="submit" className="p-3 bg-green-400">
            {mode === "create" ? "저장" : "수정"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProblemForm;
