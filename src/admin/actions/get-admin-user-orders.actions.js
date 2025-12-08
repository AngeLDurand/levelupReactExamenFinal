import { api } from "../../api/Api";

export const getAdminUserOrdersAction = async (correo) => {
  const encoded = encodeURIComponent(correo);

  const { data } = await api.get(`/orders/admin/user/${encoded}`);
  
  return data;
};
