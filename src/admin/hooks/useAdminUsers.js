
import { useQuery } from "@tanstack/react-query";
import { getAdminUsersAction } from "../actions/get-admin-users.actions";

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],      
    queryFn: getAdminUsersAction,
  });
};
