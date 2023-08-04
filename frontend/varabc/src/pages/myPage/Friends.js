import React, { useState } from 'react';
import FriendsList from '../../components/common/list/FriendsList';
import SmButton from '../../components/common/Button/SmButton';

export const Friends = () => {

  const [isFriendslist, setIsFriendslist] = useState(true);

  const FriendList = () => {
    setIsFriendslist(true);
  }

  const FriendRequestList = () => {
    setIsFriendslist(false);
  }

  return (
    <div>
      친구 화면
      <SmButton onClick={FriendList} text={'친구 목록'} bgColor={'basic'} />
      <SmButton onClick={FriendRequestList} text={'친구 요청'} bgColor={'basic'} />
      
      <FriendsList isMyFriends={isFriendslist} />
    </div>
  );
};