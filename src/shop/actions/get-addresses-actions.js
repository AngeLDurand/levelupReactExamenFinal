import { api } from "../../api/Api"

export const getAddressesAction = async()=>{
  const {data} = await api.get("/addresses");
  return data;
}