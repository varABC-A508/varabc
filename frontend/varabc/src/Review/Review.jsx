// 리뷰 페이지 (임시)

import { useState } from "react";
import ReviewTag from "./ReviewTag.jsx";

export default function Review() {
  const TAGS = [
    { index: 0, content: "가독성이 좋아요" },
    { index: 1, content: "작성 속도가 빨라요" },
    { index: 2, content: "변수명이 쉬워요" },
    { index: 3, content: "소통을 잘해요" },
  ];

  const [clicked, setClicked] = useState(Array(TAGS.length).fill(false));

  const reviewTags = TAGS.map((tag) => {
    return (
      <ReviewTag
        key={tag.index}
        index={tag.index}
        content={tag.content}
        clicked={clicked[tag.index]}
        handleTagClick={() => handleTagClick(tag.index)}
      />
    );
  });

  const handleTagClick = (index) => {
    setClicked((prevClicked) => {
      const newClicked = prevClicked.slice();
      newClicked[index] = !newClicked[index];
      console.log(`clicked ${index}`);

      return newClicked;
    });
  };

  return <div>{reviewTags}</div>;
}
