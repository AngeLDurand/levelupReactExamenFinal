import { useState } from "react";
import { AdminProductsTable } from "../../components/AdminProductsTable";
import { AdminTitle } from "../../components/AdminTitle";
import { productsMock } from "../../../mocks/products.mock";

export const AdminProductPage = () => {
  const [products, setProducts] = useState(productsMock);

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };
  return (
    <>
      <AdminTitle
        titulo={"Productos"}
        subtitulo={"Aquí puedes ver y administrar tus productos"}
      />

      <AdminProductsTable products={products} onDelete={deleteProduct} />
    </>
  );
};
