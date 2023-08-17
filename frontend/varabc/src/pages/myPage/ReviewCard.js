import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ review }) => {
  const colors = [
    'bg-cyan-200',
    'bg-teal-200',
    'bg-yellow-200',
    'bg-indigo-200',
    'bg-pink-200',
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const [sendMember, setSendMember] = useState();

  const fetchMemberInfo = (review) => {
    axios.get(`https://varabc.com:8080/mypage/${review.reviewSendMemberNo}`)
      .then((res) => {
        setSendMember(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchMemberInfo(review);
  }, [review]);

  return (
    <div className={`w-[500px] h-[300px] p-[30px] m-[20px] rounded-[20px] ${randomColor} flex flex-col justify-between`}>
      {/* <FontAwesomeIcon className='text-gray-700 w-[25px] h-[25px] ml-[640px] mb-[5px]' icon={faXmark} /> */}
      <div className='font-bold text-[20px]'>
        <div className={`flex ${(review.reviewTagReadability && review.reviewTagSpeed ? "justify-between" : "justify-start")}`}>
          {review.reviewTagReadability && <div># 가독성이 좋아요</div>}
          {review.reviewTagSpeed && <div># 작성 속도가 빨라요</div>}
        </div>
        <div className={`flex ${(review.reviewTagNaming && review.reviewTagCommunication ? "justify-between" : "justify-start")}`}>
          {review.reviewTagNaming && <div># 변수명이 쉬워요</div>}
          {review.reviewTagCommunication && <div className={`${review.reviewTagNaming ? 'ml-[100px]' : ''}`}># 소통을 잘해요</div>}
        </div>
      </div>
      <div className='mt-[5px] mb-[5px] text-[#1e3a8a] text-[24px] '>{review.reviewContent}</div>
      {/* <a className='mb-[5px] ml-[20px] '>자세히 보기</a> */}
      <div className='flex justify-end'>
        <img src={sendMember?.memberImage} alt="playerProfile" className="w-[100px] h-[100px] rounded-[16px] border-2" />
        <div className='flex items-end text-[20px] ml-[10px]'>
          <div className="text-[#0c4a6e] font-bold text-[25px]">{sendMember?.memberNickname}</div>님
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
