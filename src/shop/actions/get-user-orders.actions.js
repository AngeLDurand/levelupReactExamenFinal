import { api } from "../../api/Api";

export const getUserOrdersAction = async () => {
  const { data } = await api.get("/orders");
  
  return data;
};
