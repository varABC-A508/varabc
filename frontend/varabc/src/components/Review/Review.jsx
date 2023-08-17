// 리뷰 페이지 (임시)
import {useDispatch, useSelector} from 'react-redux';
import { setReadability, setNaming, setSpeed, setCommunication } from '../../redux/Reducer/ideReducers';
import ReviewTag from "./ReviewTag.jsx";

export default function Review() {

  const TAGS = [
    { index: 0, content: "가독성이 좋아요"},
    { index: 1, content: "작성 속도가 빨라요" },
    { index: 2, content: "변수명이 쉬워요" },
    { index: 3, content: "소통을 잘해요" },
  ];
  const dispatch = useDispatch();
  const readability = useSelector((state) => state.review.readability);
  const naming = useSelector((state) => state.review.naming);
  const speed = useSelector((state) => state.review.speed);
  const communication = useSelector((state) => state.review.communication);

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
    switch (parseInt(index)) {
      case 0:
        dispatch(setReadability(!readability));
        break;
      case 1:
        dispatch(setNaming(!naming));
        break;
      case 2:
        dispatch(setSpeed(!speed));
        break;
      case 3:
        dispatch(
          setCommunication(!communication)
        );
        break;
      default:
        break;
    }
  };

  return <div>{reviewTags}</div>;
}
