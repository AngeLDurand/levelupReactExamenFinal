// src/admin/components/AdminUsersGrid.jsx
import { Link } from "react-router";

export const AdminUsersGrid = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <p className="text-muted text-center mt-4">
        No hay usuarios registrados en el sistema.
      </p>
    );
  }

  return (
    <div className="row g-3 mt-3">
      {users.map((u, index) => (
        <div
          key={u.correo ?? index}
          className="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <div className="card h-100 shadow-sm border border-1">
            <div className="card-body d-flex flex-column align-items-center text-center">
              {/* Avatar */}
              <div
                className="rounded-circle bg-dark text-light text-uppercase d-flex align-items-center justify-content-center mb-3"
                style={{ width: "56px", height: "56px" }}
              >
                {u.nombre.charAt(0)}
              </div>

              {/* Nombre */}
              <h6 className="card-title mb-1">{u.nombre}</h6>

              {/* Correo */}
              <p className="card-text text-muted small mb-3">{u.correo}</p>

              {/* Botón Ver compras */}
              <Link
                to={`/admin/users/${encodeURIComponent(u.correo)}/orders`}
                className="btn btn-outline-primary btn-sm mt-auto"
              >
                Ver compras
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
