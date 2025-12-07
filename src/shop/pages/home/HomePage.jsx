import { CustomJumbotron } from "../../components/CustomJumbotron";
import { ProductsFilter } from "../../components/ProductsFilter";
import { ProductsGrid } from "../../components/ProductsGrid";
import { useProducts } from "../../hooks/useProducts";

export const HomePage = () => {
  const { data } = useProducts();
  return (
    <>
      <CustomJumbotron titulo={"LevelUp Gamer"} subtitulo={""} />

      <ProductsGrid products={data ?? []} />
    </>
  );
};
