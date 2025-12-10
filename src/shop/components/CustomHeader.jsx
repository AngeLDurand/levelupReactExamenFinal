import { Link, NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../../auth/store/auth.store";
import { useCart } from "../hooks/useCart";

// Encabezado principal de la tienda.Muestra: logo, login/logout, acceso a admin, carrito y perfil.

//Si la persona es administrador, se habilita también el botón ‘Admin’. Todo esto lo determinamos leyendo el estado global de autenticación (useAuthStore) y el estado global del carrito (useCart).

export const CustomHeader = () => {
  // Accedemos al estado global de autenticación (usuario, rol, logout, etc.)

  // Traemos del store de auth:
  // - authStatus: si el usuario está autenticado o no
  // - isAdmin: función que verifica si su rol es ADMIN
  // - logout: cierra la sesión
  // - rol: permite saber si es USER, ADMIN
  const { authStatus, isAdmin, logout, rol } = useAuthStore();

  // Accedemos al carrito para mostrar cuántos productos hay.
  const { totalItems } = useCart();

  // Herramienta de navegación:
  const navigate = useNavigate();

  // Verificamos si el usuario tiene rol USER para mostrar el botón de perfil
  const esUsuario = rol?.includes("USER");

  // Cerrar sesión → limpia el estado y luego enviamos al usuario a la home o pagina principal
  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Logo que lleva siempre al inicio */}
          <NavLink to={"/"}>
            <img
              src="https://levelup-gamer-assets-prod.s3.us-east-1.amazonaws.com/logoLevelUpTopBarAndroid.webp"
              alt="LevelUp"
              width="70"
              height="40"
            />
          </NavLink>
          {/* Botón hamburguesa para móviles */}
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

          {/* Contenido colapsable del menú */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto d-flex gap-2 align-items-center">
              {/* Si está autenticado → botón para cerrar sesión
                  Si NO → enlace a Login */}
              {authStatus == "autenticado" ? (
                <button className="btn btn-dark" onClick={cerrarSesion}>
                  Cerrar Sesión
                </button>
              ) : (
                <Link to={"/auth/login"}>Login</Link>
              )}

              {/* Botón Admin solo para usuarios con rol ADMIN */}
              {isAdmin() && (
                <Link
                  className="btn btn-danger text-white text-decoration-none"
                  to={"/admin"}
                >
                  Admin
                </Link>
              )}

              {/* Botón del carrito con badge indicando cantidad de productos */}
              <button
                className="btn btn-outline-secondary position-relative"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#cartOffcanvas"
                aria-controls="cartOffcanvas"
              >
                <i className="bi bi-cart3"></i>
                {/* Badge rojo si hay productos en el carrito */}
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Botón de perfil (solo cuando está autenticado Y es rol USER)
                 Para ADMIN no se muestra porque ellos usan el panel admin */}
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
