import * as DOMPurify from "dompurify";
import mimeTypeToExtension from "./mimeTypeToExtension.jsx";

// Quill에 포함된 이미지 추출
export const extractImages = async (quillRef, field) => {
  const contents = quillRef.current.getEditor().getContents();
  let imgidx = 0;
  const imageFiles = []
  
  if (contents) {
    for (const content of contents.ops) {
      if (
        typeof content.insert == "object" &&
        content.insert.hasOwnProperty("image")
      ) {
        const imageURL = content.insert.image;
        const imageFile = await imageURLToFile(imageURL, imgidx, field);
        imageFiles.push(imageFile)
        
      }
    }
  }
  return imageFiles;
}

// image blob url을 file로 변환
const imageURLToFile = async (url, idx, field) => {
  const blob = await fetch(url).then((r) => r.blob());
  const extension = mimeTypeToExtension[blob.type] || "png";
  const fileName = `${field}_${idx}.${extension}`;
  const convertedFile = new File([blob], `${fileName}`, { type: blob.type });

  return [fileName, convertedFile];
};

export const editImagesInPost = (
  mainContent,
  inputContent,
  outputContent,
  imageLinks
) => {
  if (mainContent && inputContent && outputContent && imageLinks) {
    const regex = /(<img src=")blob:[^"]*/g;

    const contents = [mainContent, inputContent, outputContent];

    const [matchesMain, matchesInput, matchesOutput] = contents.map(
      (c) => c.match(regex)?.length || 0
    );

    const totalMatches = matchesMain + matchesInput + matchesOutput;

    if (totalMatches !== imageLinks.length) {
      console.log(
        "Number of imageLinks elements does not match the total matches."
      );
      return [DOMPurify.sanitize(mainContent), DOMPurify.sanitize(inputContent), DOMPurify.sanitize(outputContent)];
    } else {
      let i = 0;
      const sanitizedContents = contents.map((content) => {
        const newContent = content.replace(
          regex,
          (match, p1) => `${p1}${imageLinks[i++]}`
        );
        const sanitizedContent = DOMPurify.sanitize(newContent);
        return sanitizedContent;
      });

      return sanitizedContents;
    }
  } else {
    return [DOMPurify.sanitize(mainContent), DOMPurify.sanitize(inputContent), DOMPurify.sanitize(outputContent)];
  }
};
