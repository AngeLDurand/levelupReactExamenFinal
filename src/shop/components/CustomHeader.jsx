import { Link, NavLink } from "react-router";
import { useAuthStore } from "../../auth/store/auth.store";

export const CustomHeader = () => {
  const { authStatus, isAdmin, logout } = useAuthStore();

  return (
    <header className="shadow-sm">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <NavLink to={"/"}>
            <img
              src="https://levelup-gamer-assets-prod.s3.us-east-1.amazonaws.com/logoLevelUpTopBarAndroid.webp"
              alt="LevelUp"
              width="70"
              height="40"
            />
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto d-flex gap-2">
              {authStatus == "autenticado" ? (
                <button className="btn btn-dark" onClick={logout}>
                  Cerrar Sesión
                </button>
              ) : (
                <Link to={"/auth/login"}>Login</Link>
              )}

              {isAdmin() && (
                <button className="btn btn-danger">
                  <Link
                    className="text-white text-decoration-none"
                    to={"/admin"}
                  >
                    Admin
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
