import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ files, handleChange, name, type }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(files)
    console.log(acceptedFiles)
    handleChange({ target: { files: acceptedFiles } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "text/*": [".txt"] },
  });

  return (
    <>
      <label
        htmlFor={type}
        className="flex items-center justify-center border-s border-b col-span-2 bg-neutral-100"
      >
        {name}
      </label>
      <div
        {...getRootProps()}
        className="p-3 text-center col-span-2 bg-white"
        style={{ display: "inline", border: "2px dashed #ccc" }}
      >
        <input {...getInputProps()} id={type} />
        {isDragActive ? <p>여기 놓기</p> : <p>{`파일 첨부하기`}</p>}
      </div>
      <div className="border-s border-b flex items-center justify-center col-span-2 bg-white">
        <p>첨부된 파일: {files.length}개</p>
      </div>
    </>
  );
};

export default FileUpload;
