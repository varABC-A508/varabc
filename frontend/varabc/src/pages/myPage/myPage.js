import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../../components/common/sidebar';
import axios from 'axios';

export const MyPage = () => {
  const [memberNo, setMemberNo] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
      axios.get('https://varabc.com:8080/member/getUserInfo', {
        headers: {
          'access-token': accessToken
        }
      })
      .then((response) => {
        const memberInfo = response.data.userInfo;
        const extractedMemberNo = memberInfo.memberNo;
        setMemberNo(extractedMemberNo);
      })
      .catch((error) => {
        console.error('Error fetching member info:', error);
      });
    }
  }, []);

  return (
    <>
      <div className='flex flex-row w-full bg-bg2 bg-cover bg-repeat-y'>
        <SideBar />
        <Outlet memberNo={memberNo} />
      </div>
    </>
  );
};
