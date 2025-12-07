import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";
import { CustomFooter } from "../components/CustomFooter";

export const ShopLayout = () => {
  return (
    <div className=" container-fluid container-md vh-100 d-flex flex-column  gap-5">
      <CustomHeader />
      <Outlet />
      <CustomFooter />
    </div>
  );
};
