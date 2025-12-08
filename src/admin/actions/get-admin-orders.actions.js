import { api } from "../../api/Api";



export const getAdminOrdersAction = async () => {
  const { data } = await api.get("/orders/admin");
  return data;
};
