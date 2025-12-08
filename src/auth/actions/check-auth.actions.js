import { api } from "../../api/Api";

export const checkAuthAction = async ()=>{
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No existe token");
  }

  try {
    const {data} = await api.get("/users/refresh-token")

    localStorage.setItem("token", data.token)
    return data;
    
  } catch (error) {
   const status = error.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        throw new Error("Token no válido");
      }
    }
    throw new Error("Error de red o servidor");
  }
