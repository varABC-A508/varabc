// 리뷰 페이지 (임시)
import ReviewTag from "./ReviewTag.jsx";

export default function Review() {

  const TAGS = [
    { index: 0, content: "가독성이 좋아요"},
    { index: 1, content: "작성 속도가 빨라요" },
    { index: 2, content: "변수명이 쉬워요" },
    { index: 3, content: "소통을 잘해요" },
  ];

  const reviewTags = TAGS.map((tag) => {
    return (
      <ReviewTag
        key={tag.index}
        index={tag.index}
        content={tag.content}
      />
    );
  });

  return <div>{reviewTags}</div>;
}
