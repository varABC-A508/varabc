import * as DOMPurify from "dompurify";
import algorithmTypes from "./problemForm/algorithmTypes";
import copper from '../img/tier/copper.png'
import iron from '../img/tier/iron.png'
import bronze from '../img/tier/bronze.png'
import silver from '../img/tier/silver.png'
import gold from '../img/tier/gold.png'
import diamond from '../img/tier/diamond.png'

export const editImagesInPost = (
  mainContent,
  inputContent,
  outputContent,
  imageLinks
) => {
  if (mainContent && inputContent && outputContent && imageLinks) {
    const regex = /(<img src=")[^"]*/g;

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

export const calculateTier = (memberExp) => {
  if (0 <= memberExp && memberExp < 20) {
    return [copper, 'COPPER'];
  } else if (20 <= memberExp && memberExp < 50) {
    return [iron, 'IRON'];
  } else if (50 <= memberExp && memberExp < 200) {
    return [bronze, 'BRONZE'];
  } else if (200 <= memberExp && memberExp < 500) {
    return [silver, 'SILVER'];
  } else if (500 <= memberExp && memberExp < 1500) {
    return [gold, 'GOLD'];
  } else {
    return [diamond, 'DIAMOND'];
  }
};