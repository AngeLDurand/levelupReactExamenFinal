import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderAction } from "../actions/create-order.actions";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrderAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    },
  });
};
