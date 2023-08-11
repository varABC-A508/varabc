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
        <div className="mb-2 px-2 border border-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition duration-150" key={file}>
          <a href={file} download={`${fileName}${idx + 1}.txt`}>
            <button>{`${fileName}${
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
      <div className="px-2 py-2 col-span-2 border-s border-t border-neutral-300 flex flex-wrap justify-between items-center">
        {downloadButtons(testCaseInputPublicList, "공개Input")}
      </div>
      <div className="ps-2 bg-neutral-100 border-s border-t border-neutral-300">
        공개 Output
      </div>
      <div className="px-2 py-2 col-span-2 border-x border-t border-neutral-300 flex flex-wrap justify-between items-center">
        {downloadButtons(testCaseOutputPublicList, "공개Output")}
      </div>
      <div className="ps-2 bg-neutral-100 border-s border-y border-neutral-300">
        비공개 Input
      </div>
      <div className="px-2 py-2 col-span-2 border-s border-y border-neutral-300 flex flex-wrap justify-between items-center">
        {downloadButtons(testCaseInputPrivateList, "비공개Input")}
      </div>
      <div className="ps-2 bg-neutral-100 border-s border-y border-neutral-300">
        비공개 Output
      </div>
      <div className="px-2 py-2 col-span-2 border-x border-y border-neutral-300 flex flex-wrap justify-between items-center">
        {downloadButtons(testCaseOutputPrivateList, "비공개Output")}
      </div>
    </>
  );
};

export default FileUploads;
