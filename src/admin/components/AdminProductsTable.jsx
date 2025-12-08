import { useNavigate } from "react-router";

const formatCLP = (num) =>
  num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

export const AdminProductsTable = ({ products }) => {
  const navigate = useNavigate();

  const editarProducto = (id) => {
    navigate(`/admin/products/${id}`);
  };

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Listado de productos</h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Imagen</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th className="text-end">Precio</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.imagenUrl}
                      alt={p.modelo}
                      width="60"
                      className="img-thumbnail"
                      style={{ objectFit: "cover", height: "60px" }}
                    />
                  </td>

                  <td>{p.modelo}</td>
                  <td>{p.marca}</td>
                  <td>{p.categoria}</td>

                  <td className="text-end fw-semibold">
                    ${formatCLP(p.precio)}
                  </td>

                  <td className="text-end">
                    {/* Botón Editar */}
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => editarProducto(p.id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                </tr>
              ))}

              {/* Si no hay productos */}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No hay productos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
