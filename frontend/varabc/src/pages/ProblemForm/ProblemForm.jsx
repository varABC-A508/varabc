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
import {
  extractImages,
  URLToFile,
} from "../../utils/problemForm/imageUtil.jsx";
import axios from "axios";
import SmButton from "../../components/common/Button/SmButton";
import swal from 'sweetalert';

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

  // 수정모드 시 이미 업로드된 테스트케이스
  const [uploadedInputPublicList, setUploadedInputPublicList] = useState([]);
  const [uploadedOutputPublicList, setUploadedOutputPublicList] = useState([]);
  const [uploadedInputPrivateList, setUploadedInputPrivateList] = useState([]);
  const [uploadedOutputPrivateList, setUploadedOutputPrivateList] = useState(
    []
  );

  // 모드 (작성, 수정)
  const [mode, setMode] = useState("create");
  const [apiUrl, setApiUrl] = useState("https://varabc.com:8080/problem/");

  // 파일 관리
  // form의 각 input field에 대한 onChange 함수
  const handlePublicInputChange = (e) => {
    if (mode === "edit") {
      setUploadedInputPublicList([]);
    }
    const files = e.target.files;
    setTestcaseInputPublicList(files);
  };

  const handlePublicOutputChange = (e) => {
    if (mode === "edit") {
      setUploadedOutputPublicList([]);
    }
    const files = e.target.files;
    setTestcaseOutputPublicList(files);
  };

  const handleInputChange = (e) => {
    if (mode === "edit") {
      setUploadedInputPrivateList([]);
    }
    const files = e.target.files;
    setTestcaseInputPrivateList(files);
  };

  const handleOutputChange = (e) => {
    if (mode === "edit") {
      setUploadedOutputPrivateList([]);
    }
    const files = e.target.files;
    setTestcaseOutputPrivateList(files);
  };

  const files = [
    testCaseInputPublicList,
    testCaseOutputPublicList,
    testCaseInputPrivateList,
    testCaseOutputPrivateList,
  ];

  const uploadedFiles = [
    uploadedInputPublicList,
    uploadedOutputPublicList,
    uploadedInputPrivateList,
    uploadedOutputPrivateList,
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

  // 이미지 blob link revoke (페이지 이동 시 수행)
  useEffect(() => {
    return () => {
      for (const url of imageURLs) {
        URL.revokeObjectURL(url);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // post create/edit 모드 관련 설정
  useEffect(() => {
    async function modeSettings() {
      if (location.pathname.endsWith("/edit")) {
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

        // 기존 업로드된 파일 저장 (새로 업로드할 파일과 따로 관리)
        const uploadedInputPublic = await Promise.all(
          inputPublic.map(
            async (file, index) => await URLToFile(file, index + 1, "PublicInput")
          )
        );
        const uploadedOutputPublic = await Promise.all(
          outputPublic.map(
            async (file, index) =>
              await URLToFile(file, index + 1, "PublicOutput")
          )
        );
        const uploadedInputPrivate = await Promise.all(
          inputPrivate.map(
            async (file, index) =>
              await URLToFile(file, index + 1, "PrivateInput")
          )
        );
        const uploadedOutputPrivate = await Promise.all(
          outputPrivate.map(
            async (file, index) =>
              await URLToFile(file, index + 1, "PrivateOutput")
          )
        );
        setUploadedInputPublicList(uploadedInputPublic);
        setUploadedOutputPublicList(uploadedOutputPublic);
        setUploadedInputPrivateList(uploadedInputPrivate);
        setUploadedOutputPrivateList(uploadedOutputPrivate);

        // 다른 문제 정보 등 데이터 저장 (redux)
        dispatch(setProblemData(problemUpdateData));
      } else {
        setMode("create");
      }
    }
    modeSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      swal ( "이런" ,  "양식을 모두 채워주세요!" ,  "error" );
      return;
    }

    const formData = new FormData();

    // 각 input field 내용 append
    for (const p in problemData) {
      formData.append(p, problemData[p]);
    }

    // 첨부파일 append 
    const files = {
      testCaseInputPublicList,
      testCaseOutputPublicList,
      testCaseInputPrivateList,
      testCaseOutputPrivateList,
    };

    const uploadedFiles = {
      testCaseInputPublicList: uploadedInputPublicList,
      testCaseOutputPublicList: uploadedOutputPublicList,
      testCaseInputPrivateList: uploadedInputPrivateList,
      testCaseOutputPrivateList: uploadedOutputPrivateList,
    };



    if (mode === "edit") {
      for (const filename in uploadedFiles) {
        if (uploadedFiles[filename].length !== 0) {
          for (let i = 0; i < uploadedFiles[filename].length; i++) {
            // console.log(`${filename}`, uploadedFiles[filename][i][1])
            formData.append(`${filename}`, uploadedFiles[filename][i][1]);
          }
        }
      }
    }


    for (const filename in files) {
      if (files[filename].length !== 0) {
        for (let i = 0; i < files[filename].length; i++) {
          // console.log(files[filename][i])
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

      // console.log("Response from server:", response.data);

      if (mode === "edit") {
        navigate(`/admin/post/${postId}`);
      } else if (mode === "create") {
        navigate(`/admin/post`)
      }
    } catch (error) {
      console.error(`Error sending data: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-3 min-h-screen mx-auto">
      <h1 className=" mb-4 w-9/12 text-4xl text-white font-bold">
        {`알고리즘 문제 ${mode === "create" ? "등록" : "수정"}`}
      </h1>
      <form onSubmit={handleSubmit} className="w-9/12">
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
            uploadedFiles={uploadedFiles}
            handleIOChange={handleIOChange}
            mode={mode}
          />
        </div>


        <div className="flex justify-end bg-transparent">
          <div className="pt-2">
            <SmButton text="취소" onClick={()=>navigate('/admin/post')} bgColor="red" type="button" />
          </div>
          <div className="pt-2">
            <SmButton text={mode==='create' ? "저장":"수정"} bgColor="green" type="submit" />
          </div>

        </div>
      </form>
    </div>
  );
};

export default ProblemForm;
