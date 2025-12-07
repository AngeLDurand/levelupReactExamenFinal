export const ProductCard = ({ product }) => {
  const { categoria, descripcion, id, imagenUrl, marca, modelo, precio } =
    product;

  const formatPrecio = (num) =>
    num.toLocaleString("es-CL", { minimumFractionDigits: 0 });

  return (
    <div className="card shadow-sm border rounded-4 mb-4 p-3">
      <div className="d-flex flex-sm-column gap-3 ">
        {/* Imagen del producto */}
        <div className="mx-auto" style={{ minWidth: "94px" }}>
          <img
            src={imagenUrl}
            alt={modelo}
            className="img-fluid rounded product-card object-fit-contain"
            style={{ height: "100px" }}
          />
        </div>

        {/* Info principal */}
        <div className="flex-grow-1">
          <div>
            <h5 className="fw-bold mb-1" style={{ height: "50px" }}>
              {modelo}
            </h5>

            <p
              className="text-muted small mb-1"
              style={{ lineHeight: "1.2", height: "50px" }}
            >
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
          </div>
          {/* Botón */}
          <button className="btn btn-primary  w-100 mt-3 ">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
