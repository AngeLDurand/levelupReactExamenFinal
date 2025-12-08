import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import { AdminTitle } from "../../components/AdminTitle";
import { useProducts } from "../../../shop/hooks/useProducts";
import { updateProductAction } from "../../actions/update-product.actions";

export const AdminProductPageEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useProducts();
  const product = data?.find((p) => p.id === Number(id));

  const [form, setForm] = useState({
    modelo: "",
    marca: "",
    categoria: "",
    precio: "",
    descripcion: "",
    imagenUrl: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        modelo: product.modelo,
        marca: product.marca,
        categoria: product.categoria,
        precio: product.precio,
        descripcion: product.descripcion,
        imagenUrl: product.imagenUrl,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateProductAction(product.id, form);

      // ⚡ Avisamos a React Query que los productos cambiaron
      queryClient.invalidateQueries({ queryKey: ["products"] });

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      // aquí podrías mostrar un toast de error
      alert("No se pudo actualizar el producto.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  // ✅ Vista de éxito
  if (isSuccess) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm p-4 text-center">
          <div className="mb-3">
            <i className="bi bi-check-circle-fill text-success display-3"></i>
          </div>
          <h2 className="fw-bold mb-2">Producto actualizado</h2>
          <p className="text-muted mb-4">
            El producto <strong>{form.modelo}</strong> se actualizó
            correctamente.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/products")}
            >
              Volver a productos
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setIsSuccess(false)}
            >
              Seguir editando
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🧾 Vista normal (formulario)
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
              <label htmlFor="imagenUrl" className="form-label">
                URL de imagen
              </label>
              <input
                type="text"
                id="imagenUrl"
                name="imagenUrl"
                className="form-control"
                value={form.imagenUrl}
                onChange={handleChange}
              />
              {form.imagenUrl && (
                <div className="mt-3 text-center">
                  <img
                    src={form.imagenUrl}
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
