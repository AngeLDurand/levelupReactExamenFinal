import { AdminProductsTable } from "../../components/AdminProductsTable";
import { AdminTitle } from "../../components/AdminTitle";

import { useProducts } from "../../../shop/hooks/useProducts";

export const AdminProductPage = () => {
  const { data } = useProducts();

  return (
    <>
      <AdminTitle
        titulo={"Productos"}
        subtitulo={"Aquí puedes ver y administrar tus productos"}
      />

      <AdminProductsTable products={data || []} />
    </>
  );
};
