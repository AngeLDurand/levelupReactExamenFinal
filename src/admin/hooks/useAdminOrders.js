import { useQuery } from "@tanstack/react-query";
import { getAdminOrdersAction } from "../actions/get-admin-orders.actions";

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["admin-orders"],   // 
    queryFn: getAdminOrdersAction,
    
  })
}