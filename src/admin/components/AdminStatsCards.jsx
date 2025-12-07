// src/admin/components/AdminStatsCards.jsx

const formatCLP = (num) =>
  num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

export const AdminStatsCards = ({
  usuariosCount,
  totalVentas,
  productosCount,
}) => {
  const stats = [
    {
      label: "Total usuarios",
      value: usuariosCount.toLocaleString("es-CL"),
      icon: "bi-people",
      iconBg: "bg-primary",
    },
    {
      label: "Ventas totales",
      value: `$${formatCLP(totalVentas)}`,
      icon: "bi-currency-dollar",
      iconBg: "bg-success",
    },
    {
      label: "Productos publicados",
      value: productosCount.toLocaleString("es-CL"),
      icon: "bi-box-seam",
      iconBg: "bg-warning",
    },
  ];

  return (
    <div className="row g-3 my-4">
      {stats.map((item, index) => (
        <div key={index} className="col-12 col-md-4">
          <div
            className="card border-1 shadow-sm rounded-4 h-100 mx-auto"
            style={{ maxWidth: "400px" }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              {/* Texto */}
              <div>
                <p className="text-muted small mb-1">{item.label}</p>
                <h3 className="fw-bold mb-0">{item.value}</h3>
              </div>

              {/* Icono */}
              <div
                className={`d-flex align-items-center justify-content-center rounded-4 ${item.iconBg}`}
                style={{ width: "48px", height: "48px" }}
              >
                <i className={`${item.icon} text-white fs-4`}></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
