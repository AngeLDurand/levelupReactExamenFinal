import { useQuery } from "@tanstack/react-query";
import { getAddressesAction } from "../actions/get-addresses-actions";

// Su propósito es definir la llamada al backend usando React Query para obtener las direcciones de un usuario.
export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddressesAction,
  });
};
