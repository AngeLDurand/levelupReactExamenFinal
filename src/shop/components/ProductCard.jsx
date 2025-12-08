import { useAuthStore } from "../../auth/store/auth.store";
import { useCart } from "../hooks/useCart";

export const ProductCard = ({ product }) => {
  const { categoria, descripcion, id, imagenUrl, marca, modelo, precio } =
    product;

  const { authStatus } = useAuthStore();
  const { addToCart, items } = useCart();

  const formatPrecio = (num) =>
    num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

  const estaEnCarrito = items.some((i) => i.id === id);
  const usuarioLogueado = authStatus === "autenticado";

  return (
    <div className="card shadow-sm border rounded-4 mb-4 p-3">
      <div className="d-flex flex-sm-column gap-3">
        {/* Imagen */}
        <div className="mx-auto" style={{ minWidth: "94px" }}>
          <img
            src={imagenUrl}
            alt={modelo}
            className="img-fluid rounded object-fit-contain"
            style={{ height: "100px" }}
          />
        </div>

        {/* Info */}
        <div className="flex-grow-1">
          <h5 className="fw-bold mb-1" style={{ height: "50px" }}>
            {modelo}
          </h5>

          <p className="text-muted small mb-1" style={{ height: "50px" }}>
            {descripcion.length > 80
              ? descripcion.slice(0, 80) + "..."
              : descripcion}
          </p>

          <p className="fw-semibold small mb-1">
            {marca} <span className="text-muted">· {categoria}</span>
          </p>

          <p className="fw-bold text-primary fs-5 mb-2">
            ${formatPrecio(precio)}
          </p>

          {/* -------------------- BOTÓN -------------------- */}
          {usuarioLogueado ? (
            // usuario autenticado
            estaEnCarrito ? (
              <button className="btn btn-success w-100" disabled>
                <i className="bi bi-check-circle me-1"></i> En carrito
              </button>
            ) : (
              <button
                className="btn btn-primary w-100"
                onClick={() => addToCart(product)}
              >
                <i className="bi bi-cart-plus me-1"></i> Agregar al carrito
              </button>
            )
          ) : (
            // usuario NO autenticado
            <>
              <button className="btn btn-secondary w-100" disabled>
                <i className="bi bi-lock me-1"></i> Inicia sesión para comprarme
              </button>
              <p className="text-muted small text-center mt-1">
                Regístrate o inicia sesión para agregar al carrito
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
