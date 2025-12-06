import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { Suspense } from "react";

export const App = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
};
