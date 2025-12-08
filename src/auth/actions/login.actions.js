import { api } from "../../api/Api"

export const loginAction=async(correo,clave)=>{

  try {
    const {data} = await api.post("/users/login",{
      correo,
      clave
    })

      localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.log(error)
    throw error;
    
  }

}