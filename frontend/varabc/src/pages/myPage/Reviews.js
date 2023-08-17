import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReviewCard from './ReviewCard';
import axios from 'axios';
import swal from "sweetalert";

export const Reviews = () => {

  const navigate = useNavigate();
  const [memberNo, setMemberNo] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
        try {
          const userToken = localStorage.getItem("access-token");
          if (!userToken) {
            swal("이런", "회원가입부터 해주세요!", "error");
            navigate("/");
            return;
          }

          const response = await axios.get(
            `https://varabc.com:8080/member/getUserInfo`,
            {
              headers: {
                "access-token": userToken,
              },
            }
          );

          if (response.status === 200) {
            setMemberNo(response.data.userInfo.memberNo);
          }
        } catch (e) {
          console.error(e);
        }
      }
    getUserInfo();
     // eslint-disable-next-line
  }, []);


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
    // eslint-disable-next-line
  }, [memberNo]);

  return (
    <div className="p-[20px] w-full">
      <h1 className="text-white mt-[10px] text-[36px] font-bold ">내 리뷰</h1>
      <h3 className="text-white mt-[15px] text-[28px]">
        내 짝의 리뷰를 확인해보세요!
      </h3>
      {reviews.length === 0 ? (
        <p>리뷰가 없습니다.</p>
      ) : (
        <div className='w-full flex justify-center'>
          <div className="flex flex-wrap justify-between w-[1100px]">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
