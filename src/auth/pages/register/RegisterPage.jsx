import { Link } from "react-router";

export const RegisterPage = () => {
  return (
    <>
      <form className="border shadow p-5 rounded">
        <h2 className="text-center my-5">Crear Cuenta</h2>

        {/* Nombre */}
        <div className="mb-3">
          <label htmlFor="inputNombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="inputNombre"
            className="form-control"
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Correo */}
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Correo
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="correo@ejemplo.com"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Contraseña
          </label>
          <input type="password" id="inputPassword" className="form-control" />
        </div>

        {/* Confirmar contraseña */}
        <div className="mb-3">
          <label htmlFor="inputConfirmPassword" className="form-label">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="inputConfirmPassword"
            className="form-control"
          />
        </div>

        {/* Botón */}
        <button type="submit" className="btn btn-primary w-100">
          Registrarme
        </button>

        {/* Enlaces inferiores */}
        <div className="text-center mt-4">
          <p className="mb-1">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/auth/login" className="text-primary">
              Inicia sesión aquí
            </Link>
          </p>

          <Link to="/" className="text-secondary small">
            Salir
          </Link>
        </div>
      </form>
    </>
  );
};
