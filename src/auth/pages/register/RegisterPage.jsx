import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth.store";
import { useRef, useState } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const toastRef = useRef(null);
  let toastInstance = null;

  const showErrorToast = () => {
    if (!toastInstance) {
      toastInstance = bootstrap.Toast.getOrCreateInstance(toastRef.current);
    }
    toastInstance.show();
  };

  const confirmPasswordRef = useRef(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const validarCoincidencia = (pass, pass2) => {
    if (!confirmPasswordRef.current) return;

    if (pass && pass2 && pass !== pass2) {
      confirmPasswordRef.current.setCustomValidity(
        "Las contraseñas no coinciden"
      );
    } else {
      confirmPasswordRef.current.setCustomValidity("");
    }
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== password2) {
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.setCustomValidity(
          "Las contraseñas no coinciden"
        );
        confirmPasswordRef.current.reportValidity();
      }
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");

    const registroExitoso = await register(name, email, password);

    if (registroExitoso) {
      navigate("/auth/login");
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
            <strong className="me-auto">Error de Registro</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            Hubo un problema con el servidor. Intenta otra vez.
          </div>
        </div>
      </div>

      <form className="border shadow p-5 rounded" onSubmit={enviarFormulario}>
        <h2 className="text-center my-5">Crear Cuenta</h2>

        {/* Nombre */}
        <div className="mb-3">
          <label htmlFor="inputNombre" className="form-label">
            Nombre
          </label>
          <input
            name="name"
            type="text"
            id="inputNombre"
            className="form-control"
            placeholder="Tu nombre completo"
            required
          />
        </div>

        {/* Correo */}
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Correo
          </label>
          <input
            name="email"
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            id="inputPassword"
            className="form-control"
            minLength={8}
            required
            value={password}
            onInput={(e) => {
              const value = e.target.value;
              setPassword(value);
              validarCoincidencia(value, password2);
            }}
          />
        </div>

        {/* Confirmar contraseña */}
        <div className="mb-3">
          <label htmlFor="inputConfirmPassword" className="form-label">
            Confirmar contraseña
          </label>
          <input
            ref={confirmPasswordRef}
            name="password2"
            type="password"
            id="inputConfirmPassword"
            className="form-control"
            minLength={8}
            required
            value={password2}
            onInput={(e) => {
              const value = e.target.value;
              setPassword2(value);
              validarCoincidencia(password, value);
            }}
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
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
