import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";

const formatCLP = (num) =>
  num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

export const CartOffcanvas = () => {
  const navigate = useNavigate();

  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleContinuarPago = () => {
    if (items.length === 0) return;
    navigate("/checkout/address");
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="cartOffcanvas"
      aria-labelledby="cartOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartOffcanvasLabel">
          Carrito ({totalItems})
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body d-flex flex-column">
        {items.length === 0 ? (
          <p className="text-muted">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="list-group mb-3 flex-grow-1">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex align-items-center gap-2"
                >
                  <img
                    src={item.imagenUrl}
                    alt={item.modelo}
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="flex-grow-1">
                    <div className="small fw-semibold">{item.modelo}</div>
                    <div className="small text-muted">
                      ${formatCLP(item.precio)} c/u
                    </div>
                  </div>

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

                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))}
            </ul>

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
