import { api } from "../../api/Api"

export const getProductsAction = async()=>{
  const {data} = await api.get("/products")

  console.log(data)

  return data;
}