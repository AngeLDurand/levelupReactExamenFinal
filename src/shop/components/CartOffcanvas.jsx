import { useNavigate } from "react-router";

import { useCart } from "../hooks/useCart";

// Función auxiliar para mostrar precios en formato CLP.
const formatCLP = (num) =>
  num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

// Este componente representa el carrito desplegable que aparece desde el lado derecho cuando el usuario hace clic en el ícono del carrito. Muestra los productos agregados, permite modificar cantidades o eliminarlos, y calcula el total.

//Usa useCart, que es donde guardamos el estado global del carrito.

//Botstrap se encarga de la animación del offcanvas
export const CartOffcanvas = () => {
  const navigate = useNavigate();

  // Extraemos del carrito:
  // - items: los productos agregados
  // - updateQuantity: aumentar o disminuir cantidad
  // - removeFromCart: eliminar un producto
  // - clearCart: vaciar todo
  // - totalItems: cantidad total de unidades
  // - totalPrice: suma total del carrito
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  // Si  el usuario quiere avanzar al pago.y  el carrito está vacío, simplemente no se hace nada. En caso contrario, si hay productos, se avanza hacia la pagina /checkout/addres
  const handleContinuarPago = () => {
    if (items.length === 0) {
      return;
    } else {
      navigate("/checkout/address");
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="cartOffcanvas"
      aria-labelledby="cartOffcanvasLabel"
    >
      {/* Encabezado del carrito */}
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartOffcanvasLabel">
          Carrito ({totalItems}) {/* Muestra cuántos items hay */}
        </h5>
        {/* Botón estándar de Bootstrap para cerrar el offcanvas */}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      {/* Cuerpo del carrito */}
      <div className="offcanvas-body d-flex flex-column">
        {/* Si el carrito está vacío, mostramos un mensaje simple */}
        {items.length === 0 ? (
          <p className="text-muted">Tu carrito está vacío.</p>
        ) : (
          <>
            {/* Lista de productos del carrito */}
            <ul className="list-group mb-3 flex-grow-1">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex align-items-center gap-2"
                >
                  {/* Imagen del producto */}
                  <img
                    src={item.imagenUrl}
                    alt={item.modelo}
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "contain",
                    }}
                  />
                  {/* Información del producto */}
                  <div className="flex-grow-1">
                    <div className="small fw-semibold">{item.modelo}</div>
                    <div className="small text-muted">
                      ${formatCLP(item.precio)} c/u
                    </div>
                  </div>

                  {/* Controles de cantidad (+ y -) */}
                  <div className="d-flex align-items-center gap-1">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-2">{item.cantidad}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Botón para eliminar el producto */}
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))}
            </ul>

            {/* Zona inferior: total y botones de acción */}
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-semibold">Total</span>
                <span className="fw-bold">${formatCLP(totalPrice)}</span>
              </div>

              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleContinuarPago}
                  data-bs-dismiss="offcanvas"
                >
                  Continuar al pago
                </button>
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={clearCart}
                >
                  Limpiar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
