// src/admin/pages/users/AdminUserPage.jsx
import { AdminTitle } from "../../components/AdminTitle";
import { AdminUsersGrid } from "../../components/AdminUsersGrid";
import { useAdminUsers } from "../../hooks/useAdminUsers";

export const AdminUserPage = () => {
  const { data, isLoading, isError, refetch } = useAdminUsers();

  if (isLoading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando usuarios...</span>
        </div>
        <p className="mt-3 text-muted">Cargando usuarios...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-4 text-center">
        <p className="text-danger mb-3">
          Ocurrió un error al cargar los usuarios.
        </p>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => refetch()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <AdminTitle
        titulo="Usuarios"
        subtitulo="Listado de usuarios registrados en el sistema"
      />

      <AdminUsersGrid users={data || []} />
    </div>
  );
};
