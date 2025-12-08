import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";

import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashBoardPage } from "./admin/pages/dashboard/DashBoardPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { lazy } from "react";
import { AdminProductPageEdit } from "./admin/pages/product/AdminProductPageEdit";
import {
  AdminRoute,
  NoAuthenticatedRoute,
} from "./auth/components/ProtectedRoutes";
import { AdminOrderPage } from "./admin/pages/order/AdminOrderPage";

const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));

const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products/",
        element: <ProductPage />,
      },
    ],
  },

  {
    path: "/auth",
    element: (
      <NoAuthenticatedRoute>
        <AuthLayout />
      </NoAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
      {
        path: "products",
        element: <AdminProductPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductPageEdit />,
      },
      {
        path: "orders",
        element: <AdminOrderPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
