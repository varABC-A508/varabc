import React, { useState, useEffect } from 'react';
import SmButton from '../Button/SmButton';
// import axios from 'axios';

const FriendsList = ({ isMyFriends }) => {

  // 친구 목록을 저장할 상태 변수
  const [friends, setFriends] = useState([]);

  const myFriend = () => {
    // 예시 데이터로 임의의 친구 목록 생성
    const exampleFriends = [
      { id: 1, profile: '프로필1', teer: '티어1', name: '이름1' },
      { id: 2, profile: '프로필2', teer: '티어2', name: '이름2' },
      { id: 3, profile: '프로필3', teer: '티어3', name: '이름3' },
      { id: 4, profile: '프로필4', teer: '티어4', name: '이름4' },
    ];

    setFriends(exampleFriends);

// // 백엔드 서버로부터 친구 목록을 가져오는 API 호출
// axios.get('/api/friends')
//   .then(response => {
//     // 가져온 친구 목록을 상태 변수에 설정
//     setFriends(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching friends:', error);
//   });
  };

  const myRequest = () => {
    // 예시 데이터로 임의의 친구 요청 목록 생성
    const exampleRequests = [
      { id: 5, profile: '프로필5', teer: '티어5', name: '이름5' },
      { id: 6, profile: '프로필6', teer: '티어6', name: '이름6' },
    ];

    setFriends(exampleRequests);

// axios.get('/api/friends/request')
//   .then(res => {
//     setFriends(res.data);
//   })
  };

  useEffect(() => {
    isMyFriends ? myFriend() : myRequest()
  }, [isMyFriends]);

  return (
    <div >
      {friends.length === 0 ? (
        <p>목록이 없습니다.</p>
      ) : (
        <ul>
          {friends.map((friend, index) => (
            // 임시 값 수정 필요
            <li
              key={friend.id}
              className={`bg-gray-700 text-white hover:bg-gray-200 flex justify-around items-center h-20  w-4/5 border border-black 
              ${index === 0 ? 'rounded-t-md' : ''} ${index === friends.length - 1 ? 'rounded-b-md' : ''}`}
            >
              <div className="flex justify-start">
                <p>{friend.profile}</p>
                <p>{friend.teer}</p>
                <p>{friend.name}</p>
              </div>
              {isMyFriends ? (
                <SmButton text={"친구 삭제"} bgColor={"red"} />
              ) : (
                <div>
                  <SmButton text={"요청 수락"} bgColor={"green"} />
                  <SmButton text={"요청 거절"} bgColor={"red"} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

export default FriendsList;