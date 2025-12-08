import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store";

export const AuthenticatedRoute = ({ children }) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "por-chequear") {
    return null;
  }

  if (authStatus === "no-autenticado") {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export const NoAuthenticatedRoute = ({ children }) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "por-chequear") {
    return null;
  }

  if (authStatus === "autenticado") {
    return <Navigate to="/" />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { authStatus, isAdmin } = useAuthStore();

  if (authStatus === "por-chequear") {
    return null;
  }

  if (authStatus === "no-autenticado") {
    return <Navigate to="/auth/login" />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
};
