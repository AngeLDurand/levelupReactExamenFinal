import { useQuery } from "@tanstack/react-query";
import { getAddressesAction } from "../actions/get-addresses-actions";

export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddressesAction,
  });
};
