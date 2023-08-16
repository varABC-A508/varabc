import { useSelector } from "react-redux";

const FileUploads = () => {
  const {
    testCaseInputPublicList,
    testCaseOutputPublicList,
    testCaseInputPrivateList,
    testCaseOutputPrivateList,
  } = useSelector((state) => state.problemPost);

  const downloadButtons = (files, fileName) => {
    const buttons = files.map((file, idx) => {
      return (
        <div className="ms-3 mb-3 px-2 border border-neutral-900 rounded-md hover:bg-neutral-500 hover:text-white transition duration-200" key={file}>
          <a href={file} download={`${fileName}_${idx + 1}.txt`}>
            <button>{`${fileName}_${
            idx + 1
          }.txt`}</button></a>
        </div>
      );
    });

    return buttons;
  };

  return (
    <>
      <div className="ps-2 bg-neutral-100 border-s border-t border-neutral-300">
        공개 Input
      </div>
      <div className="px-2 py-2 col-span-2 border-s border-t border-neutral-300 flex flex-wrap items-center">
        {downloadButtons(testCaseInputPublicList, "PublicInput")}
      </div>
      <div className="ps-2 bg-neutral-100 border-s border-t border-neutral-300">
        공개 Output
      </div>
      <div className="px-2 py-2 col-span-2 border-x border-t border-neutral-300 flex flex-wrap items-center">
        {downloadButtons(testCaseOutputPublicList, "PublicOutput")}
      </div>
      <div className="ps-2 bg-neutral-100 border-s border-y border-neutral-300">
        비공개 Input
      </div>
      <div className="px-2 py-2 col-span-2 border-s border-y border-neutral-300 flex flex-wrap items-center">
        {downloadButtons(testCaseInputPrivateList, "PrivateInput")}
      </div>
      <div className="ps-2 bg-neutral-100 border-s border-y border-neutral-300">
        비공개 Output
      </div>
      <div className="px-2 py-2 col-span-2 border-x border-y border-neutral-300 flex flex-wrap items-center">
        {downloadButtons(testCaseOutputPrivateList, "PrivateOutput")}
      </div>
    </>
  );
};

export default FileUploads;
