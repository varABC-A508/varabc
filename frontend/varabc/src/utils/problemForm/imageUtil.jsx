import mimeTypeToExtension from "./mimeTypeToExtension.jsx";

// Quill에 포함된 이미지 추출
export const extractImages = async (quillRef, field) => {
  const contents = quillRef.current.getEditor().getContents();
  let imgidx = 0;
  const imageFiles = [];

  if (contents) {
    for (const content of contents.ops) {
      if (
        typeof content.insert == "object" &&
        content.insert.hasOwnProperty("image")
      ) {
        const imageURL = content.insert.image;
        const imageFile = await URLToFile(imageURL, imgidx, field);
        imageFiles.push(imageFile);
      }
    }
  }
  return imageFiles;
};

// url을 file로 변환
// 주로 이미지용으로 사용 예정이어서 mimeTypeToExtension에 없으면 기본값 png로 설정해둠 
export const URLToFile = async (url, idx, field) => {
  const blob = await fetch(url).then((r) => r.blob());
  const extension = mimeTypeToExtension[blob.type] || "png";
  const fileName = `${field}_${idx}.${extension}`;
  const convertedFile = new File([blob], `${fileName}`, { type: blob.type });

  return [fileName, convertedFile];
};
