import { api } from "../../api/Api"

export const registerAction=async(nombre, correo,clave)=>{

  try {
    await api.post("/users/register",{
      nombre,
      correo,
      clave
    })

    return ;
  } catch (error) {
    console.log(error)
    throw error;
    
  }

}