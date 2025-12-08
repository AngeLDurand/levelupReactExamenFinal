// src/shop/pages/checkout/CheckoutAddressPage.jsx
import { useState } from "react";
import { useAddresses } from "../../hooks/useAddresses";
import { useCreateAddress } from "../../hooks/useCreateAddress";
import { useNavigate } from "react-router";

export const CheckoutAddressPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useAddresses();
  const { mutateAsync: createAddress, isLoading: isCreating } =
    useCreateAddress();

  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    calle: "",
    ciudad: "",
  });

  const addresses = data || [];

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSelectedId(false);
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.calle || !form.ciudad) return;

    try {
      const nueva = await createAddress({
        nombre: form.nombre,
        calle: form.calle,
        ciudad: form.ciudad,
      });

      //seleccionar automáticamente la nueva dirección
      setSelectedId(nueva.id);
      setForm({ nombre: "", calle: "", ciudad: "" });
    } catch (error) {
      console.error(error);
      alert("No se pudo crear la dirección");
    }
  };

  // dentro de CheckoutAddressPage.jsx
  const handleContinuar = () => {
    if (!selectedId) {
      alert("Selecciona una dirección para continuar");
      return;
    }
    navigate(`/checkout/summary?addressId=${selectedId}`);
  };

  if (isLoading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando direcciones...</span>
        </div>
        <p className="mt-3 text-muted">Cargando tus direcciones...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-4 text-center">
        <p className="text-danger mb-3">
          Ocurrió un error al cargar tus direcciones.
        </p>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => refetch()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Puedes usar tu AdminTitle o un título propio */}
      <h2 className="mb-3">Selecciona tu dirección</h2>
      <p className="text-muted mb-4">
        Elige una dirección para el envío o crea una nueva.
      </p>

      <hr className="border-secondary mt-3 mb-5" />

      <div className="row g-4">
        {/* Columna: lista de direcciones */}
        <div className="col-12 col-md-6">
          <h5 className="mb-3">Tus direcciones</h5>

          {addresses.length === 0 ? (
            <p className="text-muted">
              Aún no tienes direcciones guardadas. Crea una con el formulario de
              la derecha.
            </p>
          ) : (
            <div className="d-flex flex-column gap-2">
              {addresses.map((addr) => {
                const isSelected = selectedId === addr.id;

                return (
                  <button
                    key={addr.id}
                    type="button"
                    className={
                      "btn text-start w-100 border rounded-3 p-3 d-flex justify-content-between align-items-center " +
                      (isSelected
                        ? "btn-outline-primary border-primary"
                        : "bg-white")
                    }
                    onClick={() => setSelectedId(addr.id)}
                  >
                    <div>
                      <div className="fw-semibold">{addr.nombre}</div>
                      <div className="small text-muted">
                        {addr.calle}, {addr.ciudad}
                      </div>
                    </div>

                    {isSelected && (
                      <i className="bi bi-check-circle-fill text-primary fs-4"></i>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-4 d-flex gap-2">
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Volver a la tienda
            </button>
            <button
              className="btn btn-primary"
              onClick={handleContinuar}
              disabled={!selectedId}
            >
              Continuar con esta dirección
            </button>
          </div>
        </div>

        {/* Columna: formulario nueva dirección */}
        <div className="col-12 col-md-6">
          <h5 className="mb-3">Nueva dirección</h5>

          <form
            className="card shadow-sm border-0 p-3"
            onSubmit={handleCreateAddress}
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="nombre">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChangeForm}
                placeholder="Ej: Casa Principal"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="calle">
                Calle
              </label>
              <input
                type="text"
                id="calle"
                name="calle"
                className="form-control"
                value={form.calle}
                onChange={handleChangeForm}
                placeholder="Ej: Av. Urmeneta 550"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="ciudad">
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                className="form-control"
                value={form.ciudad}
                onChange={handleChangeForm}
                placeholder="Ej: Limache"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isCreating || selectedId}
            >
              {isCreating ? "Guardando..." : "Crear dirección"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
