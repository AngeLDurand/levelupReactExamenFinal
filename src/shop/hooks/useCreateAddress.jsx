import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddressAction } from "../actions/create-address.actions";

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddressAction,
    onSuccess: () => {
      // Vuelve a pedir /addresses para que aparezca la nueva dirección
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
