import { useAuthStore } from "../../../auth/store/auth.store";
import { ordersMock } from "../../../mocks/orders.mock";
import { productsMock } from "../../../mocks/products.mock";
import { usersMock } from "../../../mocks/users.mock";
import { AdminOrdersTable } from "../../components/AdminOrdersTable";
import { AdminStatsCards } from "../../components/AdminStatsCards";
import { AdminTitle } from "../../components/AdminTitle";

export const DashBoardPage = () => {
  const { user, email } = useAuthStore();
  const totalVentas = ordersMock
    .filter((o) => o.estado === "PAGADO")
    .reduce((acc, o) => acc + o.total, 0);

  const ordenesPagadas = ordersMock.filter((o) => o.estado === "PAGADO").length;
  const usuariosCount = usersMock.length;
  const productosCount = productsMock.length;
  return (
    <>
      <AdminTitle
        titulo={"Dashboard"}
        subtitulo={`Hola ${user}, aquí puedes ver el estado de tu negocio`}
      />

      <AdminStatsCards
        usuariosCount={usuariosCount}
        totalVentas={totalVentas}
        productosCount={productosCount}
      />

      {/* Tabla con las últimas 5 ventas */}
      <AdminOrdersTable orders={ordersMock} limit={5} />
    </>
  );
};
