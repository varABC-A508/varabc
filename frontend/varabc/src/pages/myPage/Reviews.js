import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import axios from 'axios';

export const Reviews = ({ memberNo }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = () => {
    axios.get(`https://varabc.com:8080/mypage/review/${memberNo}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [memberNo]);

  return (
    <div className="ml-[30px]">
      <h1 className="text-white bold mt-[10px] ">내 리뷰</h1>
      <h3 className="text-white mt-[15px]">내 짝의 리뷰를 확인해보세요!</h3>
      {reviews.length === 0 ? (
        <p>리뷰가 없습니다.</p>
      ) : (
        <div className='flex justify-around'>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};
