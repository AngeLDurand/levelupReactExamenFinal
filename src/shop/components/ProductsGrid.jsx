import { useSearchParams } from "react-router";
import { ProductCard } from "./ProductCard";
import { ProductsFilter } from "./ProductsFilter";

// Este componente recibe todos los productos y se encarga de:
// 1. Leer la categoría seleccionada desde la URL (?categoria=...)
// 2. Filtrar los productos según esa categoría
// 3. Renderizar el filtro + la grilla de productos
//El estado del filtro no se guarda en React, sino en la URL
export const ProductsGrid = ({ products }) => {
  // useSearchParams nos permite leer y modificar los parámetros de la URL.
  // Ejemplo: /?categoria=notebooks
  const [searchParams, setSearchParams] = useSearchParams();

  // Si existe un parámetro "categoria", lo usamos; si no, usamos "all".
  const filtroCategoria = searchParams.get("categoria") || "all";

  // Función que actualiza la URL cuando el usuario cambia la categoría.
  const cambiarCategoriaURL = (value) => {
    // Si elige "all", quitamos el parámetro de la URL
    if (value === "all") {
      searchParams.delete("categoria");
    } else {
      // Si elige otra categoría, actualizamos la URL con el nuevo valor
      searchParams.set("categoria", value);
    }
    // Aplicamos el cambio a la URL
    setSearchParams(searchParams);
  };

  // Filtrado real de productos.
  // Si la categoría es "all", mostramos todos; si no, filtramos por la categoría seleccionada.
  const productosFiltrados =
    filtroCategoria === "all"
      ? products
      : products.filter((p) => p.categoria === filtroCategoria);

  return (
    <>
      {/* Barra de filtros */}
      <ProductsFilter
        currentCategory={filtroCategoria}
        onChangeCategory={cambiarCategoriaURL}
      />

      {/* Grilla de productos */}
      <div className="row g-4">
        {productosFiltrados.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-lg-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};
