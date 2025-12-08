import { Link, useNavigate } from "react-router";
import { useRef, useState } from "react";
import { useAuthStore } from "../../store/auth.store";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const toastRef = useRef(null);
  let toastInstance = null;
  const [isLoading, setIsLoading] = useState(false);

  const showErrorToast = () => {
    if (!toastInstance) {
      toastInstance = bootstrap.Toast.getOrCreateInstance(toastRef.current);
    }
    toastInstance.show();
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const loginExitoso = await login(email, password);

    if (loginExitoso) {
      navigate("/");
    } else {
      showErrorToast();
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* Toast de error */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          ref={toastRef}
          className="toast text-bg-danger"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Error de inicio</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            Credenciales incorrectas. Inténtalo nuevamente.
          </div>
        </div>
      </div>

      <form className="border shadow p-5 rounded" onSubmit={enviarFormulario}>
        <h2 className="text-center my-5">Iniciar Sesión</h2>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p className="mb-1">
            ¿No tienes una cuenta?{" "}
            <Link to="/auth/register" className="text-primary">
              Créala aquí
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
