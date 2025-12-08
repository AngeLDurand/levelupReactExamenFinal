import { api } from "../../api/Api";

export const createOrderAction = async ({ addressId, items }) => {
  const { data } = await api.post("/orders", {
    addressId,
    items,
  });
  return data;
};
