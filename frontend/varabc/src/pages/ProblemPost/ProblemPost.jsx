import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProblemData } from "../../redux/Actions/problemPostActions";
import axios from "axios";
import ProblemInfo from "./ProblemInfo/ProblemInfo";
import Editors from "./Editors/Editors";
import FileUploads from "./FileUploads/FileUploads";

import { editImagesInPost } from "../../utils/problemUtil";

import { useNavigate, useParams } from "react-router-dom";
import SmButton from "../../components/common/Button/SmButton";

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
    navigate(`/admin/post/${problemData.problemNo}/edit`, {
      state: { data: problemUpdateData },
    });
  };

  const handleDeleteClick = async (e) => {
    try {
      const response = await axios.patch(
        `https://varabc.com:8080/problem/${postId}/delete`
      );
      // console.log(response.data);
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
        // console.log(response);

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
    <div className="flex flex-col items-center mx-auto p-3 min-h-screen">
      <h1 className=" mb-4 w-9/12 text-4xl text-white font-bold">
        알고리즘 문제 정보
      </h1>
      <div className="w-9/12">
        <div className="bg-white grid grid-cols-6">
          <ProblemInfo />
          <Editors />
          <FileUploads />
        </div>
        <div className="flex justify-end bg-transparent">
          <div className="pt-2">
            <SmButton text="삭제" onClick={handleDeleteClick} bgColor="red" />
          </div>
          <div className="pt-2">
            <SmButton text="수정" onClick={handleEditClick} bgColor="green" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPost;
