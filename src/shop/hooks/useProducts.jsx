import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.actions";

//  para obtener la lista de productos desde el backend.
export const useProducts = () => {
  // Identificador único para esta consulta.
  // React Query usa esta clave para:
  // - almacenar la lista de productos en caché
  // - saber si debe refetch cuando algo cambie
  // - compartir los datos entre componentes sin refetch duplicado
  return useQuery({
    queryKey: ["products"],

    // Función que realiza la solicitud real a la API para obtener productos.
    // Se encuentra encapsulada en /actions para mantener limpia la lógica.
    queryFn: getProductsAction,
  });
};
