import LogoutItem from "./LogoutItem";
import SidebarItem from "./sidebarItem";

export const SideBar = () => {

  return (
    <div className="flex flex-col bg-primary min-w-[266px] pt-[60px] p-[20px] h-screen">
      <SidebarItem to="profile" text="내 프로필" icon="user" />
      <SidebarItem to="history" text="내 전적" icon="statistics" />
      <SidebarItem to="reviews" text="내 리뷰" icon="review" />
      <LogoutItem />
    </div>
  );
};