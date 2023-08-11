const FileUploads = ({ handleIOChange, mode }) => {
  const originalFiles = (files, fileName) => {
    const allFiles = files.map((file, idx) => {
      return (
        <div className="px-2 py-1 border-rose-300 rounded-full" key={file}>
          <a href={file} download={`${fileName}${idx + 1}.txt`}>
            <button>{`${fileName}${idx + 1}`}</button>
          </a>
        </div>
      );
    });
  };
  return (
    <>
      <label
        htmlFor="testcaseInputPublic"
        className="flex items-center ps-2 bg-neutral-100 border-s border-b border-neutral-300"
      >
        공개 Input
      </label>
      <input
        type="file"
        accept=".txt"
        id="testcaseInputPublic"
        className="ps-2 py-1 col-span-2 bg-white border-s border-b border-neutral-300"
        onChange={handleIOChange[0]}
        multiple
      />
      <label
        htmlFor="testcaseOutputPublic"
        className="flex items-center ps-2 bg-neutral-100 border-s border-b border-neutral-300"
      >
        공개 Output
      </label>
      <input
        type="file"
        accept=".txt"
        id="testcaseOutputPublic"
        className="ps-2 py-1 col-span-2 bg-white border-x border-b border-neutral-300"
        onChange={handleIOChange[1]}
        multiple
      />
      <label
        htmlFor="testcaseInputPrivate"
        className="flex items-center ps-2 bg-neutral-100 border-s border-b border-neutral-300"
      >
        비공개 Input
      </label>
      <input
        type="file"
        accept=".txt"
        id="testcaseInputPrivate"
        className="ps-2 py-1 col-span-2 bg-white border-s border-b border-neutral-300"
        onChange={handleIOChange[2]}
        multiple
      />
      <label
        htmlFor="testcaseOutputPrivate"
        className="flex items-center ps-2 bg-neutral-100 border-s border-b border-neutral-300"
      >
        비공개 Output
      </label>
      <input
        type="file"
        accept=".txt"
        id="testcaseOutputPrivate"
        className="ps-2 py-1 col-span-2 bg-white border-x border-b border-neutral-300"
        onChange={handleIOChange[3]}
        multiple
      />
    </>
  );
};

export default FileUploads;
