import FileUpload from "./FileUpload";

const FileUploads = ({ files, uploadedFiles, handleIOChange, mode }) => {
  return (
    <>
      <FileUpload files={files[0]} uploadedFiles={uploadedFiles[0]} handleChange={handleIOChange[0]} name='공개 Input' type='publicInput' mode={mode} />
      <FileUpload files={files[1]} uploadedFiles={uploadedFiles[1]} handleChange={handleIOChange[1]} name='공개 Output' type='publicOutput' mode={mode} />
      <FileUpload files={files[2]} uploadedFiles={uploadedFiles[2]} handleChange={handleIOChange[2]} name='비공개 Input' type='privateInput' mode={mode} />
      <FileUpload files={files[3]} uploadedFiles={uploadedFiles[3]} handleChange={handleIOChange[3]} name='비공개 Output' type='priateOutput' mode={mode} />
    </>
  );
};

export default FileUploads;
