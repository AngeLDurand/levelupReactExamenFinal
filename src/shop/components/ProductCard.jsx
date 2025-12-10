import { useAuthStore } from "../../auth/store/auth.store";
import { useCart } from "../hooks/useCart";

//ProductCard muestra cada producto de la tienda de forma compacta

//Lo clave es que integra lógica del carrito y del estado de autenticación: si el usuario no está logueado, se bloquea el botón; si el producto ya está en el carrito, el botón cambia a ‘En carrito’; si no, permite agregarlo.

export const ProductCard = ({ product }) => {
  // Desestructuramos las propiedades del producto para usarlas fácilmente en la UI.
  const { categoria, descripcion, id, imagenUrl, marca, modelo, precio } =
    product;

  // Importamos el store de autenticación para saber si el usuario está logueado.
  const { authStatus } = useAuthStore();

  // Importamos el hook del carrito para poder agregar productos y revisar su estado.
  const { addToCart, items } = useCart();

  // Utilidad para mostrar el precio con formato clp.
  const formatPrecio = (num) =>
    num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

  // Determinamos si este producto ya está agregado al carrito.
  const estaEnCarrito = items.some((i) => i.id === id);

  // Determinamos si el usuario está autenticado.
  const usuarioLogueado = authStatus === "autenticado";

  return (
    <div className="card shadow-sm border rounded-4 mb-4 p-3">
      <div className="d-flex flex-sm-column gap-3">
        {/* Sección de imagen del producto */}
        <div className="mx-auto" style={{ minWidth: "94px" }}>
          <img
            src={imagenUrl}
            alt={modelo}
            className="img-fluid rounded object-fit-contain"
            style={{ height: "100px" }}
          />
        </div>

        {/* Información del producto */}
        <div className="flex-grow-1">
          {/* Nombre del modelo */}
          <h5 className="fw-bold mb-1" style={{ height: "50px" }}>
            {modelo}
          </h5>
          {/* Descripción corta (si es larga se recorta con "...") */}
          <p className="text-muted small mb-1" style={{ height: "50px" }}>
            {descripcion.length > 80
              ? descripcion.slice(0, 80) + "..."
              : descripcion}
          </p>

          {/* Marca y categoría */}
          <p className="fw-semibold small mb-1">
            {marca} <span className="text-muted">· {categoria}</span>
          </p>

          {/* Precio formateado */}
          <p className="fw-bold text-primary fs-5 mb-2">
            ${formatPrecio(precio)}
          </p>

          {/*LÓGICA DEL BOTÓN */}

          {/*  // Si el usuario está autenticado y el producto fue agregado al carrito mostramos un boton verde que dice "en carrito", en caso contrario, mostramos un boton azul con el mensaje "agregar carrito"  */}
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
            // usuario NO autenticado, no pertimos agregar el producto al carrito y mostramos mensaje informativo
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
