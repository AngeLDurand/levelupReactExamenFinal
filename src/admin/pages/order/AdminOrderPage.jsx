import { AdminTitle } from "../../components/AdminTitle";
import { AdminOrdersTable } from "../../components/AdminOrdersTable";
import { useAdminOrders } from "../../hooks/useAdminOrders";
import { CustomFullScreenLoading } from "../../../auth/components/CustomFullScreenLoading";

export const AdminOrderPage = () => {
  const { data, isLoading, isError, error, refetch } = useAdminOrders();

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (isError) {
    return (
      <div className="container py-4 text-center">
        <p className="text-danger mb-3">
          Ocurrió un error al cargar las órdenes.
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
    <>
      <AdminTitle
        titulo="Órdenes"
        subtitulo="Listado de todas las órdenes de compra"
      />

      <div className="container">
        <AdminOrdersTable orders={data || []} />
      </div>
    </>
  );
};
