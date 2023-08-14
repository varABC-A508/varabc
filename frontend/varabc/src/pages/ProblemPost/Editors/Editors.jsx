import { useSelector} from "react-redux";

const Editors = () => {

  const problemData = useSelector((state) => state.problemPost);
  const { problemContent, problemInputContent, problemOutputContent }  = problemData


  return (
    <>
      <div className="ps-2 col-span-6 bg-neutral-100 border-x border-t border-neutral-300">
        문제 내용
      </div>
      <div className="px-2 py-4 col-span-6 border-x border-y border-neutral-300" dangerouslySetInnerHTML={{
        __html: problemContent
      }}/>
      <div className="ps-2 col-span-6 bg-neutral-100 border-x border-neutral-300">
        입력에 관한 설명
      </div>
      <div className="px-2 py-4 col-span-6 border-x border-y border-neutral-300" dangerouslySetInnerHTML={{
        __html: problemInputContent
      }}/>
      <div className="ps-2 col-span-6 bg-neutral-100 border-x border-neutral-300">
        출력에 관한 설명
      </div>
      <div className="px-2 py-4 col-span-6 border-x border-y border-neutral-300" dangerouslySetInnerHTML={{
        __html: problemOutputContent
      }}/>

    </>
  );
};

export default Editors;
