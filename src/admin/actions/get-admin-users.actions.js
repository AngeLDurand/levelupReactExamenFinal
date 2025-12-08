import { api } from "../../api/Api";

export const getAdminUsersAction = async () => {
  
  const { data } = await api.get("/users/admin");
  return data;
};
