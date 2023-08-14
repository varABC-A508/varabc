import * as DOMPurify from "dompurify";
import algorithmTypes from "./problemForm/algorithmTypes";

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
      return [
        DOMPurify.sanitize(mainContent),
        DOMPurify.sanitize(inputContent),
        DOMPurify.sanitize(outputContent),
      ];
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
    return [
      DOMPurify.sanitize(mainContent),
      DOMPurify.sanitize(inputContent),
      DOMPurify.sanitize(outputContent),
    ];
  }
};

export const algorithmTypeIntToString = (algorithmType) => {
  const algorithms = []; 
  for (let i=0; i<algorithmType.length; i++) {
    if (algorithmType[i] === "1") {
      algorithms.push(algorithmTypes[i].algoType)
    }
  }

  const algorithmString = algorithms.join(', ');

  return algorithmString
}