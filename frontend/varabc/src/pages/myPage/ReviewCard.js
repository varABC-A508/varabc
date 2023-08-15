import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
    <div className={`w-[700px] h-[320px] p-4 rounded-lg ${randomColor}`}>
      <FontAwesomeIcon className='text-gray-700 w-[25px] h-[25px] ml-[640px] mb-[5px]' icon={faXmark} />
      <div className='font-bold text-[25px]'>
        <div className='flex'>
          {review.reviewTagReadability && <p className='ml-[10px]'># 가독성이 좋아요</p>}
          {review.reviewTagSpeed && <p className={`${review.reviewTagReadability ? 'ml-[100px]' : 'ml-[10px]'}`}># 작성 속도가 빨라요</p>}
        </div>
        <div className='flex'>
          {review.reviewTagNaming && <p className='ml-[10px]'># 변수명이 쉬워요</p>}
          {review.reviewTagCommunication && <p className={`${review.reviewTagNaming ? 'ml-[100px]' : 'ml-[10px]'}`}># 소통을 잘해요</p>}
        </div>
      </div>
      <p className='mt-[5px] mb-[5px] text-[#1e3a8a] ml-[20px] '>{review.reviewContent}</p>
      {/* <a className='mb-[5px] ml-[20px] '>자세히 보기</a> */}
      <div className='flex mt-[10px] mb-[10px] ml-[20px] '>
        <img src={sendMember?.memberImage} alt="playerProfile" className="w-[100px] h-[100px] rounded-[16px] border-2" />
        <div className='flex items-end text-[20px] ml-[10px]'>
          <p className="text-[#0c4a6e] font-bold text-[25px]">{sendMember?.memberNickname}</p>님
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
