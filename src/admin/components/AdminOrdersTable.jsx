import { usersMock } from "../../mocks/users.mock";

const formatCLP = (num) =>
  num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

const formatDate = (iso) => new Date(iso).toISOString().slice(0, 10);

const getUserNameByEmail = (email) => {
  const user = usersMock.find((u) => u.correo === email);
  return user ? user.nombre : email;
};

export const AdminOrdersTable = ({ orders, limit }) => {
  const data = limit ? orders.slice(0, limit) : orders;

  if (!data || data.length === 0) {
    return <p className="text-muted">No hay ventas registradas.</p>;
  }

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h5 className="card-title mb-3">
          {limit ? "Ventas recientes" : "Todas las ventas"}
        </h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th># Orden</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{formatDate(order.fecha)}</td>
                  <td>{getUserNameByEmail(order.userEmail)}</td>
                  <td>
                    <span
                      className={
                        "badge " +
                        (order.estado === "PAGADO"
                          ? "bg-success"
                          : order.estado === "PENDIENTE"
                          ? "bg-warning text-dark"
                          : "bg-secondary")
                      }
                    >
                      {order.estado}
                    </span>
                  </td>
                  <td className="text-end fw-semibold">
                    ${formatCLP(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
