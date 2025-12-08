import { useQuery } from "@tanstack/react-query";
import { getUserOrdersAction } from "../actions/get-user-orders.actions";

export const useUserOrders = () => {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: getUserOrdersAction,
  });
};
