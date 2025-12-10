import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { CustomFullScreenLoading } from "./auth/components/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";
import { CartProvider } from "./shop/context/CartProvider";

// 1) Creamos una instancia de React Query para manejar caché de datos
const queryClient = new QueryClient();

// 2) Componente que se encarga de VALIDAR el token al inicio.No deja cargar la app hasta que el servidor confirme si el usuario sigue autenticado.
const CheckAuthProvider = ({ children }) => {
  // React Query ejecuta refrescarToken automáticamente
  const { refrescarToken } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ["auth"], // cacheamos el estado de auth
    queryFn: refrescarToken, // función que valida token
    retry: false, // no reintenta en caso de falla
  });

  // Mientras se valida el token → mostramos pantalla de carga
  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  // Cuando termina → mostramos los componentes hijos
  return children;
};

// 3) App principal: la raíz de toda la aplicación
export const App = () => {
  return (
    // React Query envuelve toda la app para permitir caching y mutaciones
    <QueryClientProvider client={queryClient}>
      {/* Suspense permite cargar componentes Lazy con un fallback de carga */}
      <Suspense fallback={<CustomFullScreenLoading />}>
        {/* Validamos autenticación antes de mostrar la app */}
        <CheckAuthProvider>
          {/* Carrito global: toda la app accede a él mediante Context */}
          <CartProvider>
            {/* Router: controla la navegación de la app */}
            <RouterProvider router={appRouter} />
          </CartProvider>
        </CheckAuthProvider>
      </Suspense>

      {/* Herramienta de desarrollo para visualizar queries */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
