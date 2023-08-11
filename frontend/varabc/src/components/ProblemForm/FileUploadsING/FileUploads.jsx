import FileUpload from "./FileUpload";

const FileUploads = ({ files, handleIOChange, mode }) => {

  return (
    <>
      <FileUpload files={files[0]} handleChange={handleIOChange[0]} name='공개 Input' type='publicInput'/>
    </>
  );
};

export default FileUploads;
