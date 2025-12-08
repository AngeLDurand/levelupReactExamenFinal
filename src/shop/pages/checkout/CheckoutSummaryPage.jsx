import { useSearchParams, useNavigate } from "react-router";
import { useAddresses } from "../../hooks/useAddresses";
import { useCart } from "../../hooks/useCart";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useState, useMemo } from "react";
import { useAuthStore } from "../../../auth/store/auth.store";

const formatCLP = (num) =>
  num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

export const CheckoutSummaryPage = () => {
  const { email } = useAuthStore();

  const storageKey = `cart_${email}`;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const addressIdParam = searchParams.get("addressId");
  const addressId = addressIdParam ? Number(addressIdParam) : null;

  const { data: addresses, isLoading: loadingAddresses } = useAddresses();
  const { items, totalPrice, clearCart } = useCart();

  const {
    mutateAsync: createOrder,
    isLoading: isCreating,
    isSuccess,
  } = useCreateOrder();

  const [errorMessage, setErrorMessage] = useState("");

  const selectedAddress = useMemo(() => {
    if (!addresses || !addressId) return null;
    return addresses.find((a) => a.id === addressId) || null;
  }, [addresses, addressId]);

  const handleFinalizarCompra = async () => {
    setErrorMessage("");

    try {
      const payload = {
        addressId,
        items: items.map((i) => ({
          productId: i.id,
          cantidad: i.cantidad,
        })),
      };

      await createOrder(payload);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Ocurrió un error al registrar tu compra. Intenta nuevamente."
      );
    }
  };

  // Si no hay carrito o no hay addressId, mejor redirigir
  if (!addressId || items.length === 0) {
    return (
      <div className="container py-4 text-center">
        <p className="text-danger mb-3">
          No se pudo iniciar el resumen de compra. Verifica tu carrito y
          dirección.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  if (loadingAddresses) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando dirección...</span>
        </div>
        <p className="mt-3 text-muted">Cargando la dirección seleccionada...</p>
      </div>
    );
  }

  if (!selectedAddress) {
    return (
      <div className="container py-4 text-center">
        <p className="text-danger mb-3">
          La dirección seleccionada no se encontró.
        </p>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/checkout/address")}
        >
          Volver a seleccionar dirección
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Resumen de compra</h2>
      <p className="text-muted mb-4">
        Revisa tus productos y la dirección de envío antes de finalizar.
      </p>

      {/* Mensaje de éxito */}
      {isSuccess && (
        <div className="alert alert-success d-flex flex-column gap-4 justify-content-center text-center align-items-center">
          <div>
            <strong>¡Compra realizada con éxito!</strong>
            <div>Gracias por tu compra en LevelUp Gamer </div>
          </div>
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              navigate("/");
              clearCart(storageKey);
            }}
          >
            Volver a la tienda
          </button>
        </div>
      )}

      {/* Mensaje de error */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {!isSuccess && (
        <>
          <div className="row g-4">
            {/* Columna izquierda: productos */}
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-body-tertiary">
                  <h5 className="mb-0">Productos</h5>
                </div>
                <div className="card-body">
                  {items.length === 0 ? (
                    <p className="text-muted">
                      No hay productos en el carrito.
                    </p>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item d-flex align-items-center gap-3"
                        >
                          <img
                            src={item.imagenUrl}
                            alt={item.modelo}
                            style={{
                              width: "56px",
                              height: "56px",
                              objectFit: "contain",
                            }}
                          />
                          <div className="flex-grow-1">
                            <div className="fw-semibold">{item.modelo}</div>
                            <div className="small text-muted">
                              ${formatCLP(item.precio)} c/u
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="small text-muted">
                              x{item.cantidad}
                            </div>
                            <div className="fw-semibold">
                              ${formatCLP(item.precio * item.cantidad)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Columna derecha: dirección + total */}
            <div className="col-12 col-lg-4">
              {/* Dirección */}
              <div className="card shadow-sm border-0 mb-3">
                <div className="card-header bg-body-tertiary">
                  <h6 className="mb-0">Dirección de envío</h6>
                </div>
                <div className="card-body">
                  <p className="mb-1 fw-semibold">{selectedAddress.nombre}</p>
                  <p className="mb-0 small text-muted">
                    {selectedAddress.calle}, {selectedAddress.ciudad}
                  </p>

                  <button
                    className="btn btn-link btn-sm p-0 mt-2"
                    onClick={() => navigate("/checkout/address")}
                  >
                    Cambiar dirección
                  </button>
                </div>
              </div>

              {/* Resumen de pago */}
              <div className="card shadow-sm border-0">
                <div className="card-header bg-body-tertiary">
                  <h6 className="mb-0">Detalle de pago</h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>${formatCLP(totalPrice)}</span>
                  </div>
                  {/* Si tuvieras envío, impuestos, etc., los agregas aquí */}
                  <div className="d-flex justify-content-between mb-3">
                    <span className="fw-semibold">Total a pagar</span>
                    <span className="fw-bold">${formatCLP(totalPrice)}</span>
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    onClick={handleFinalizarCompra}
                    disabled={isCreating || isSuccess || items.length === 0}
                  >
                    {isCreating ? "Procesando compra..." : "Finalizar compra"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
