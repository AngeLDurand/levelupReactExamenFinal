import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { productsMock } from "../../../mocks/products.mock";
import { AdminTitle } from "../../components/AdminTitle";

export const AdminProductPageEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productsMock.find((p) => p.id === Number(id));

  const [form, setForm] = useState({
    modelo: "",
    marca: "",
    categoria: "",
    precio: "",
    descripcion: "",
    imagen_url: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        modelo: product.modelo,
        marca: product.marca,
        categoria: product.categoria,
        precio: product.precio,
        descripcion: product.descripcion,
        imagen_url: product.imagen_url,
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container py-4">
        <p className="text-danger">Producto no encontrado.</p>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/products")}
        >
          Volver a productos
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí luego harás la petición PUT/PATCH a tu API
    console.log("Producto actualizado:", { id: product.id, ...form });

    alert("Producto actualizado (mock). Aquí iría la llamada a la API.");
    navigate("/admin/products");
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  return (
    <div className="container py-3">
      <AdminTitle
        titulo={`Editar producto #${product.id}`}
        subtitulo={product.modelo}
      />

      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-8 col-lg-6">
          <form className="card shadow-sm border-0 p-4" onSubmit={handleSubmit}>
            {/* Modelo */}
            <div className="mb-3">
              <label htmlFor="modelo" className="form-label">
                Modelo
              </label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                className="form-control"
                value={form.modelo}
                onChange={handleChange}
                required
              />
            </div>

            {/* Marca */}
            <div className="mb-3">
              <label htmlFor="marca" className="form-label">
                Marca
              </label>
              <input
                type="text"
                id="marca"
                name="marca"
                className="form-control"
                value={form.marca}
                onChange={handleChange}
                required
              />
            </div>

            {/* Categoría */}
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">
                Categoría
              </label>
              <input
                type="text"
                id="categoria"
                name="categoria"
                className="form-control"
                value={form.categoria}
                onChange={handleChange}
                required
              />
              {/* Si quieres, esto puede ser un <select> con categorías fijas */}
            </div>

            {/* Precio */}
            <div className="mb-3">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                className="form-control"
                value={form.precio}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="form-control"
                rows="3"
                value={form.descripcion}
                onChange={handleChange}
              />
            </div>

            {/* Imagen URL + preview */}
            <div className="mb-3">
              <label htmlFor="imagen_url" className="form-label">
                URL de imagen
              </label>
              <input
                type="text"
                id="imagen_url"
                name="imagen_url"
                className="form-control"
                value={form.imagen_url}
                onChange={handleChange}
              />
              {form.imagen_url && (
                <div className="mt-3 text-center">
                  <img
                    src={form.imagen_url}
                    alt={form.modelo}
                    className="img-fluid rounded"
                    style={{ maxHeight: "160px", objectFit: "contain" }}
                  />
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
