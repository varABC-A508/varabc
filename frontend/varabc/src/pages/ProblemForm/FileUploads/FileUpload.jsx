const FileUpload = ({files, uploadedFiles, handleChange, name, type, mode}) => {

  const fileNum = files.length + uploadedFiles.length;
  
  const fileList = Array.from(files).map((file, idx) => {
    return <li key={`${file.name}_${idx}`}>{`- ${file.name}`}</li>
  })

 
  const uploadedFileList = uploadedFiles.map((file, idx) => {
    // console.log(file)
    return <li key={`${file[0]}_${idx}`}>{`- ${file[0]}`}</li>
  })


  return (
    <>
      <div className="flex ps-2 py-3 bg-neutral-100 border-s border-b border-neutral-300">
        { name }
      </div>
      <div className='px-2 py-1 col-span-2 bg-white border-s border-b border-neutral-300'>
        <div className="mx-auto px-2">
          <label htmlFor={type} className='h-9 flex flex-row border border-neutral-300 rounded-md overflow-hidden cursor-pointer'>
            <div className='w-8/12 my-0 p-2 flex items-center overflow-hidden' id="fileNum">첨부파일 {fileNum}개</div>
            <div className='w-4/12 my-0 p-2 flex items-center justify-center border-s overflow-hidden hover:bg-neutral-300 transition duration-200'>파일 선택</div>
          </label>
          <input type="file" accept=".txt" name={type} id={type} className='hidden' onChange={handleChange} multiple/>
          <ul id="fileList" className="min-h-[15px] mt-1 p-2 flex flex-col">{mode==='edit'?uploadedFileList:''}{fileList}</ul>
        </div>

      </div>
    </>
  )

}

export default FileUpload; 

