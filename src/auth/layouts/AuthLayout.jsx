import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="container vh-100  d-flex flex-column align-items-center justify-content-center gap-5">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
