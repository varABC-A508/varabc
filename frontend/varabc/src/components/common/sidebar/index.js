import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="flex flex-col mr-10">
      <Link to="/mypage/profile">내 프로필</Link>
      <Link to="/mypage/history">내 전적</Link>
      <Link to="/mypage/reviews">내 리뷰</Link>
      <Link to="/mypage/friends">내 친구</Link>
    </div>
  );
};