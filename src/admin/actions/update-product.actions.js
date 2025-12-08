import { api } from "../../api/Api";

export const updateProductAction = async (id, producto) => {
  try {
    const payload = {
      modelo: producto.modelo,
      marca: producto.marca,
      categoria: producto.categoria,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagenUrl: producto.imagenUrl, 
    };

    const { data } = await api.put(`/products/${id}`, payload);

    return data; 
  } catch (error) {
    console.error("Error al actualizar producto", error);
    throw error;
  }
};