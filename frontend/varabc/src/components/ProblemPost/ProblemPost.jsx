import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProblemData } from "../../redux/Actions/problemPostActions";
import axios from "axios";
import ProblemInfo from "./ProblemInfo/ProblemInfo";
import Editors from "./Editors/Editors";
import FileUploads from "./FileUploads/FileUploads";

import { editImagesInPost } from "../../utils/problemForm/imageUtil";

import { useNavigate, useParams } from "react-router-dom";

const ProblemPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const problemData = useSelector((state) => state.problemPost);
  const { isAdmin } = useSelector((state) => state.admin);

  const handleEditClick = (e) => {
    const {
      problemTitle,
      problemLevel,
      problemSource,
      problemAlgorithmType,
      problemLink,
      problemContent,
      problemInputContent,
      problemOutputContent,
      testCaseInputPublicList,
      testCaseOutputPublicList,
      testCaseInputPrivateList,
      testCaseOutputPrivateList,
    } = problemData;

    const problemUpdateData = {
      problemTitle,
      problemLevel,
      problemSource,
      problemAlgorithmType,
      problemLink,
      problemRestrictionTimePython: problemData.problemRestrictionPython,
      problemRestrictionTimeJava: problemData.problemRestrictionJava,
      problemRestrictionMemory: problemData.problemRestrictionMemory,
      problemContent,
      problemInputContent,
      problemOutputContent,
      inputPublic: testCaseInputPublicList,
      outputPublic: testCaseOutputPublicList,
      inputPrivate: testCaseInputPrivateList,
      outputPrivate: testCaseOutputPrivateList,
    };

    // const { problemNo, problemSubmitCount, problemCorrectCount, problemImageS3Url, problemResign, problemRestrictionResign, ...problemUpdateData } = problemData
    navigate(`/admin/edit/${problemData.problemNo}`, {
      state: { data: problemUpdateData },
    });
  };

  const handleDeleteClick = async (e) => {
    try {
      const response = await axios.delete(
        `https://varabc.com:8080/problem/${postId}`
      );
      console.log(response.data);
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  //admin 확인 (임시)
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://varabc.com:8080/problem/${postId}/admin`
        );
        console.log(response);

        const data = response.data;

        const [mainResult, inputResult, outputResult] = editImagesInPost(
          data.problemContent,
          data.problemInputContent,
          data.problemOutputContent,
          data.problemImageS3Url
        );
        const newData = {
          ...data,
          problemContent: mainResult,
          problemInputContent: inputResult,
          problemOutputContent: outputResult,
        };

        dispatch(setProblemData(newData));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center p-3 bg-bg2 bg-cover">
      <h1 className=" mb-4 w-3/5 text-4xl text-white font-bold">
        알고리즘 문제 정보
      </h1>
      <div className="w-3/5">
        <div className="bg-white grid grid-cols-6">
          <ProblemInfo />
          <Editors />
          <FileUploads />
        </div>
        <div className="flex justify-end bg-transparent">
          <button onClick={handleEditClick} className="p-3 me-2 bg-teal-400">
            수정
          </button>
          <button onClick={handleDeleteClick} className="p-3 bg-rose-400">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemPost;
