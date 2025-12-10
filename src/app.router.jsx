import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";

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
import { AdminUserPage } from "./admin/pages/user/AdminUserPage";
import { AdminUserOrdersPage } from "./admin/pages/user/AdminUserOrdersPage";
import { CheckoutAddressPage } from "./shop/pages/checkout/CheckoutAddressPage";
import { CheckoutSummaryPage } from "./shop/pages/checkout/CheckoutSummaryPage";
import { ProfilePage } from "./shop/pages/profile/ProfilePage";

// Lazy permite cargar paginas solo cuando se necesitan, lo que ayuda a que la app cargue más rápido.
const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));

const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));

// Definición principal del sistema de rutas

export const appRouter = createBrowserRouter([
  // --------------------------
  // Rutas principales de la tienda
  // --------------------------
  {
    path: "/",
    element: <ShopLayout />, // Estructura con header/footer
    children: [
      {
        index: true,
        element: <HomePage />, // Página de inicio con los productos
      },
      {
        path: "checkout/address",
        element: <CheckoutAddressPage />, // Paso 1 del checkout: elegir dirección
      },
      {
        path: "checkout/summary",
        element: <CheckoutSummaryPage />, // Paso 2 del checkout: revisar y pagar
      },
      { path: "profile", element: <ProfilePage /> }, // Perfil del usuario logueado
    ],
  },

  // --------------------------
  // Rutas de autenticación (login/register)
  // --------------------------

  {
    path: "/auth",
    // Bloqueamos estas rutas para usuarios ya logueados. Si iniciaron sesión y tienen token, no deben volver a entrar al login.
    element: (
      <NoAuthenticatedRoute>
        <AuthLayout />
      </NoAuthenticatedRoute>
    ),
    children: [
      // Si alguien escribe "/auth", lo enviamos a "/auth/login"
      {
        index: true,

        element: <Navigate to="/auth/login" />,
      },

      //pagina de login
      {
        path: "login",
        element: <LoginPage />,
      },

      //pagina de registro de usuarios
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  // --------------------------
  // Rutas del panel de administración
  // Solo accesibles para usuarios con rol ADMIN
  // --------------------------

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
        element: <DashBoardPage />, // Dashboard principal
      },
      {
        path: "products",
        element: <AdminProductPage />, // Pagina para ver Lista de productos
      },
      {
        path: "products/:id",
        element: <AdminProductPageEdit />, // Editar producto por ID
      },
      {
        path: "orders",
        element: <AdminOrderPage />, // Ver todas las órdenes o compras
      },
      {
        path: "users",
        element: <AdminUserPage />, // Ver lista de todos los usuarios del sistema
      },
      {
        path: "users/:correo/orders",
        element: <AdminUserOrdersPage />, // Ver órdenes específicas de un usuario según su correo
      },
    ],
  },

  // --------------------------
  // Ruta por defecto para errores
  // Si alguien escribe algo inexistente lo enviamos a la home de la tienda (/)
  // --------------------------
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
