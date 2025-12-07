import { useSearchParams } from "react-router";
import { ProductCard } from "./ProductCard";
import { ProductsFilter } from "./ProductsFilter";

export const ProductsGrid = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filtroCategoria = searchParams.get("categoria") || "all";

  const cambiarCategoriaURL = (value) => {
    if (value === "all") {
      searchParams.delete("categoria");
    } else {
      searchParams.set("categoria", value);
    }
    setSearchParams(searchParams);
  };

  const productosFiltrados =
    filtroCategoria === "all"
      ? products
      : products.filter((p) => p.categoria === filtroCategoria);

  return (
    <>
      <ProductsFilter
        currentCategory={filtroCategoria}
        onChangeCategory={cambiarCategoriaURL}
      />
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
