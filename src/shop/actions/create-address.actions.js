import { api } from "../../api/Api";

export const createAddressAction = async ({ nombre, calle, ciudad }) => {
  const { data } = await api.post("/addresses", {
    nombre,
    calle,
    ciudad,
  });

  return data;
};
