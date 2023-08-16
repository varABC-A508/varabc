// 리뷰 페이지 (임시)
import {useDispatch, useSelector} from 'react-redux';
import { setReadability, setNaming, setSpeed, setCommunication } from '../../redux/Actions/reviewActions';
import ReviewTag from "./ReviewTag.jsx";

export default function Review() {

  const TAGS = [
    { index: 0, content: "가독성이 좋아요"},
    { index: 1, content: "작성 속도가 빨라요" },
    { index: 2, content: "변수명이 쉬워요" },
    { index: 3, content: "소통을 잘해요" },
  ];
  const dispatch = useDispatch();

  const reviewTags = TAGS.map((tag) => {
    return (
      <ReviewTag
        key={tag.index}
        index={tag.index}
        content={tag.content}
        handleTagClick={() => handleTagClick(tag.index)}
      />
    );
  });

  const handleTagClick = (index) => {
    switch (index) {
      case 0:
        dispatch(
          setReadability(!useSelector((state) => state.review.readability))
        );
        break;
      case 1:
        dispatch(setNaming(!useSelector((state) => state.review.naming)));
        break;
      case 2:
        dispatch(setSpeed(!useSelector((state) => state.review.speed)));
        break;
      case 3:
        dispatch(
          setCommunication(!useSelector((state) => state.review.communication))
        );
        break;
    }
  };

  return <div>{reviewTags}</div>;
}
