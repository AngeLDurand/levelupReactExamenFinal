import { useQuery } from "@tanstack/react-query";
import { getAdminUserOrdersAction } from "../actions/get-admin-user-orders.actions";

export const useAdminUserOrders = (correo) => {
  return useQuery({
    queryKey: ["admin-user-orders", correo],
    queryFn: () => getAdminUserOrdersAction(correo),
    enabled: !!correo, 
  });
};
