import React, { useState } from 'react';
import FriendsList from '../../components/common/list/FriendsList';
import SmButton from '../../components/common/Button/SmButton';

export const Friends = () => {

  const [isFriendslist, setIsFriendslist] = useState(true);

  const handleFriendListClick = () => {
    setIsFriendslist(true);
  }

  const handleFriendRequestListClick = () => {
    setIsFriendslist(false);
  }

  return (
    <div>
      친구 화면
      <SmButton onClick={handleFriendListClick} text={'친구 목록'} bgColor={'basic'} />
      <SmButton onClick={handleFriendRequestListClick} text={'친구 요청'} bgColor={'basic'} />

      <FriendsList key={isFriendslist} isMyFriends={isFriendslist} />
    </div>
  );
};