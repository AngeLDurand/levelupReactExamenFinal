// src/shop/components/CustomHeader.jsx
import { Link, NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../../auth/store/auth.store";
import { useCart } from "../hooks/useCart";

export const CustomHeader = () => {
  const { authStatus, isAdmin, logout, rol } = useAuthStore();
  const { totalItems } = useCart();

  const navigate = useNavigate();
  const esUsuario = rol?.includes("USER");

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink to={"/"}>
            <img
              src="https://levelup-gamer-assets-prod.s3.us-east-1.amazonaws.com/logoLevelUpTopBarAndroid.webp"
              alt="LevelUp"
              width="70"
              height="40"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto d-flex gap-2 align-items-center">
              {authStatus == "autenticado" ? (
                <button className="btn btn-dark" onClick={cerrarSesion}>
                  Cerrar Sesión
                </button>
              ) : (
                <Link to={"/auth/login"}>Login</Link>
              )}

              {isAdmin() && (
                <Link
                  className="btn btn-danger text-white text-decoration-none"
                  to={"/admin"}
                >
                  Admin
                </Link>
              )}

              {/* Botón carrito */}
              <button
                className="btn btn-outline-secondary position-relative"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#cartOffcanvas"
                aria-controls="cartOffcanvas"
              >
                <i className="bi bi-cart3"></i>
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Botón perfil (solo usuario autenticado con rol USER) */}
              {authStatus == "autenticado" && esUsuario && (
                <button
                  type="button"
                  className="btn btn-outline-primary d-flex align-items-center gap-1"
                  onClick={() => navigate("/profile")}
                >
                  <i className="bi bi-person-circle"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
