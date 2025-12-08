import { useAuthStore } from "../../../auth/store/auth.store";

import { AdminOrdersTable } from "../../components/AdminOrdersTable";
import { AdminStatsCards } from "../../components/AdminStatsCards";
import { AdminTitle } from "../../components/AdminTitle";

import { useProducts } from "../../../shop/hooks/useProducts";
import { useAdminOrders } from "../../hooks/useAdminOrders";
import { useAdminUsers } from "../../hooks/useAdminUsers";

export const DashBoardPage = () => {
  const { user } = useAuthStore();

  const { data: products, isLoading: loadingProducts } = useProducts();
  const { data: orders, isLoading: loadingOrders } = useAdminOrders();
  const { data: users, isLoading: loadingUsers } = useAdminUsers();

  const isLoading = loadingProducts || loadingOrders || loadingUsers;

  const paidOrders = (orders || []).filter((o) => o.estado === "PAGADO");

  const totalVentas = paidOrders.reduce((acc, o) => acc + o.total, 0);

  const usuariosCount = (users || []).length;
  const productosCount = (products || []).length;

  if (isLoading) {
    return (
      <>
        <AdminTitle
          titulo="Dashboard"
          subtitulo={`Hola ${user || "Admin"}, cargando datos de tu negocio...`}
        />

        <div className="container py-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">
            Obteniendo estadísticas en tiempo real...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminTitle
        titulo="Dashboard"
        subtitulo={`Hola ${
          user || "Admin"
        }, aquí puedes ver el estado de tu negocio`}
      />

      <AdminStatsCards
        usuariosCount={usuariosCount}
        totalVentas={totalVentas}
        productosCount={productosCount}
      />

      <AdminOrdersTable orders={orders || []} limit={5} />
    </>
  );
};
