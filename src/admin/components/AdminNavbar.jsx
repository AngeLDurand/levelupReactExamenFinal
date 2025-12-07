import { Link, NavLink, useNavigate } from "react-router";

export const AdminNavbar = () => {
  const navigate = useNavigate();

  const irATienda = () => {
    navigate("/");
  };

  const cerrarSesion = () => {
    navigate("/auth/login");
  };

  return (
    <nav className="navbar navbar-expand-lg  mb-4 bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <NavLink to={"/admin"}>
          <img
            src="https://levelup-gamer-assets-prod.s3.us-east-1.amazonaws.com/logoLevelUpTopBarAndroid.webp"
            alt="LevelUp"
            width="70"
            height="40"
          />
        </NavLink>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="adminNavbar">
          {/* Links de la izquierda */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-1"
                to="/admin"
              >
                <i className="bi bi-speedometer2"></i>
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-1"
                to="/admin/orders"
              >
                <i className="bi bi-bag-check"></i>
                Órdenes
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-1"
                to="/admin/products"
              >
                <i className="bi bi-box-seam"></i>
                Productos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-1"
                to="/admin/users"
              >
                <i className="bi bi-people"></i>
                Usuarios
              </Link>
            </li>
          </ul>

          {/* Botones de la derecha */}
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-light btn-sm"
              type="button"
              onClick={irATienda}
            >
              Ir a tienda
            </button>

            <button
              className="btn btn-danger btn-sm"
              type="button"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
