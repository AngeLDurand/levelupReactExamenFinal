// src/shop/pages/profile/ProfilePage.jsx
import { useAuthStore } from "../../../auth/store/auth.store";
import { useUserOrders } from "../../hooks/useUserOrders";

const formatCLP = (num) =>
  num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

const formatFecha = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("es-CL", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const ProfilePage = () => {
  const { user, email } = useAuthStore();
  const { data, isLoading, isError, refetch } = useUserOrders();

  const orders = data || [];

  return (
    <div className="container py-4">
      <h2 className="mb-3">Mi perfil</h2>
      <p className="text-muted mb-4">
        Aquí puedes ver tu información y el historial de tus compras.
      </p>

      {/* Card con datos de usuario */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{ width: "64px", height: "64px", fontSize: "1.5rem" }}
          >
            {user?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h5 className="mb-1">{user}</h5>
            <p className="mb-0 text-muted">{email}</p>
          </div>
        </div>
      </div>

      {/* Sección de compras */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Mis compras</h4>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => refetch()}
        >
          Actualizar
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando compras...</span>
          </div>
          <p className="mt-2 text-muted">Cargando tus compras...</p>
        </div>
      )}

      {isError && (
        <div className="alert alert-danger">
          Ocurrió un error al cargar tus compras. Intenta nuevamente.
        </div>
      )}

      {!isLoading && !isError && orders.length === 0 && (
        <p className="text-muted">
          Aún no has realizado compras. ¿Qué tal si te das una vuelta por la
          tienda? 🎮
        </p>
      )}

      <div className="d-flex flex-column gap-5">
        {orders.map((order) => (
          <div key={order.id} className="card shadow-sm border-1">
            <div className="card-header bg-body-tertiary d-flex justify-content-between align-items-center">
              <div>
                <span className="small text-muted">Orden #</span>
                <span className="fw-semibold ms-1">{order.id}</span>
                <span className="small text-muted ms-3">
                  {formatFecha(order.fecha)}
                </span>
              </div>
              <span
                className={
                  "badge " +
                  (order.estado === "PAGADO"
                    ? "text-bg-success"
                    : "text-bg-secondary")
                }
              >
                {order.estado}
              </span>
            </div>

            <div className="card-body">
              {/* Dirección */}
              <p className="small text-muted mb-2">
                Envío a: {order.direccionCalle}, {order.direccionCiudad}
              </p>

              {/* Items */}
              <ul className="list-group list-group-flush mb-3">
                {order.items.map((item) => (
                  <li
                    key={item.productoId}
                    className="list-group-item d-flex align-items-center gap-3"
                  >
                    <img
                      src={item.imagenUrl}
                      alt={item.modelo}
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "contain",
                      }}
                    />
                    <div className="flex-grow-1">
                      <div className="small fw-semibold">{item.modelo}</div>
                      <div className="small text-muted">
                        x{item.cantidad} · $
                        {formatCLP(item.precioUnitarioPagado)} c/u
                      </div>
                    </div>
                    <div className="fw-semibold small">
                      ${formatCLP(item.precioUnitarioPagado * item.cantidad)}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total */}
              <div className="d-flex justify-content-between border-top pt-3">
                <span className="fw-semibold">Total pagado</span>
                <span className="fw-bold">${formatCLP(order.total)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
