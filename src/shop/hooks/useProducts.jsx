import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.actions";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsAction,
  });
};
