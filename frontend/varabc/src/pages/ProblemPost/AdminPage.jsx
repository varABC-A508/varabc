import { Outlet } from "react-router-dom";
import { SideBarAdmin } from "../../components/common/sidebar/SidebarAdmin";

const AdminPage = () => {
  return (
    <div className="flex flex-row w-full bg-bg2 bg-cover">
      <SideBarAdmin />
      <Outlet />
    </div>
  );
};

export default AdminPage;
