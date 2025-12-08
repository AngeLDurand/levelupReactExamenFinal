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

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }) => {
  const { refrescarToken } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: refrescarToken,
    retry: false,
  });

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  return children;
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<CustomFullScreenLoading />}>
        <CheckAuthProvider>
          <RouterProvider router={appRouter} />
        </CheckAuthProvider>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
