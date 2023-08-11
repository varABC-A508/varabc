import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import {
  setTestcaseInputPublic,
  setTestcaseOutputPublic,
  setTestcaseInputPrivate,
  setTestcaseOutputPrivate
} from "../redux/Reducer/problemFormReducers"; 

const FileUpload = ({field}) => {


  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    console.log(fileFields[field].files); 
    dispatch(fileFields[field].setFiles([...fileFields[field].files, ...acceptedFiles]))
  }, []); 

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true, accept:'text/plain'});
  
  const fileFields = {
    inputPublic: {text:'공개 input', files: testcaseInputPublic, setFiles: setTestcaseInputPublic}, 
    outputPublic: {text:'공개 output', files: testcaseOutputPublic, setFiles: setTestcaseOutputPublic}, 
    inputPrivate: {text: '비공개 input', files: testcaseInputPrivate, setFiles: setTestcaseInputPrivate}, 
    outputPrivate: {text: '비공개 output', files: testcaseOutputPrivate, setFiles: setTestcaseOutputPrivate}, 
  }


  return (
    <>
      <label htmlFor={field} className='flex items-center justify-center border-s border-b'>{fileFields[field].text}</label>
      <div {...getRootProps()} className="p-3 text-center" style={{ display: "inline", border: '2px dashed #ccc' }}>
        <input {...getInputProps()} id={field} />
        {isDragActive ? (
          <p>여기 놓기</p>
        ) : (
          <p>{ `파일 첨부하기`}</p>
        )}
      </div>
      <div className='border-s border-b flex items-center justify-center'>
        <p>첨부된 파일: {fileFields[field].files.length}개</p>
      </div>
    
    </>
  );


}

export default FileUpload; 

