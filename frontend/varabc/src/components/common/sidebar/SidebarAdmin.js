import LogoutItem from "./LogoutItem";
import SidebarItemAdmin from "./SidebarItemAdmin";

export const SideBarAdmin = () => {

  return (
    <div className="flex flex-col mr-10 bg-primary min-w-[266px] pt-[60px] p-[20px]">
      <SidebarItemAdmin to="post" text="문제 관리" icon="problem" />
      <LogoutItem />
    </div>
  );
};