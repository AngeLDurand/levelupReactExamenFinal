import { AdminTitle } from "../../components/AdminTitle";
import { AdminOrdersTable } from "../../components/AdminOrdersTable";
import { useAdminOrders } from "../../hooks/useAdminOrders";

const formatCLP = (num) =>
  num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

export const AdminOrderPage = () => {
  const { data, isLoading, isError, refetch } = useAdminOrders();

  if (isLoading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando órdenes...</span>
        </div>
        <p className="mt-3 text-muted">Cargando órdenes...</p>
      </div>
    );
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

  const orders = data || [];

  const paidOrders = orders.filter((o) => o.estado === "PAGADO");
  const totalVentas = paidOrders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdenes = orders.length;
  const ordenesPagadas = paidOrders.length;

  return (
    <>
      <AdminTitle
        titulo="Órdenes"
        subtitulo="Listado y resumen de todas las órdenes de compra"
      />

      <div className="container mb-4">
        {/* Stats arriba */}
        <div className="row g-3 mb-4">
          {/* Total órdenes */}
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div
                  className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="bi bi-receipt fs-4" />
                </div>
                <div>
                  <p className="mb-1 text-muted small">Órdenes totales</p>
                  <h4 className="mb-0 fw-bold">{totalOrdenes}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Órdenes pagadas */}
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div
                  className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="bi bi-bag-check-fill fs-4" />
                </div>
                <div>
                  <p className="mb-1 text-muted small">Órdenes pagadas</p>
                  <h4 className="mb-0 fw-bold">{ordenesPagadas}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Total ventas */}
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div
                  className="rounded-circle bg-warning-subtle text-warning d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="bi bi-cash-stack fs-4" />
                </div>
                <div>
                  <p className="mb-1 text-muted small">Total ventas</p>
                  <h4 className="mb-0 fw-bold">${formatCLP(totalVentas)}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla completa de órdenes */}
        <AdminOrdersTable orders={orders} />
      </div>
    </>
  );
};
