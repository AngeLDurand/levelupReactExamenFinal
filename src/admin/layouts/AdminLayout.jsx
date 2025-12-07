import { Outlet } from "react-router";

import { AdminNavbar } from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className=" container-fluid container-md vh-100 ">
      <AdminNavbar />

      <Outlet />
    </div>
  );
};

export default AdminLayout;
