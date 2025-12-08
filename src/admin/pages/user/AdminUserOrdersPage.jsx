import { useNavigate, useParams } from "react-router";
import { AdminTitle } from "../../components/AdminTitle";
import { AdminOrdersTable } from "../../components/AdminOrdersTable";
import { useAdminUserOrders } from "../../hooks/useAdminUserOrders";
import { CustomFullScreenLoading } from "../../../auth/components/CustomFullScreenLoading";

export const AdminUserOrdersPage = () => {
  const { correo } = useParams();
  const navigate = useNavigate();

  const decodedCorreo = decodeURIComponent(correo);
  const { data, isLoading, isError, refetch } =
    useAdminUserOrders(decodedCorreo);

  if (isLoading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">
            Cargando compras de usuario...
          </span>
        </div>
        <p className="mt-3 text-muted">Cargando compras de usuario...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-4 text-center">
        <p className="text-danger mb-3">
          Ocurrió un error al cargar las compras de este usuario.
        </p>
        <button
          className="btn btn-outline-primary btn-sm me-2"
          onClick={() => refetch()}
        >
          Reintentar
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate("/admin/users")}
        >
          Volver a usuarios
        </button>
      </div>
    );
  }

  const orders = data || [];

  return (
    <div className="container py-3">
      <AdminTitle
        titulo={`Compras de ${decodedCorreo}`}
        subtitulo="Listado de órdenes asociadas a este usuario"
      />

      {orders.length === 0 ? (
        <p className="text-muted mt-3 text-center">
          Este usuario aún no tiene órdenes registradas.
        </p>
      ) : (
        <AdminOrdersTable orders={orders} />
      )}

      <div className="mt-4 d-flex justify-content-center">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate("/admin/users")}
        >
          Volver a usuarios
        </button>
      </div>
    </div>
  );
};
