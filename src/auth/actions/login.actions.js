import { api } from "../../api/Api"

export const loginAction=async(correo,clave)=>{

  try {
    const {data} = await api.post("/users/login",{
      correo,
      clave
    })

    console.log(data)

    return data;
  } catch (error) {
    console.log(error)
    throw error;
    
  }

}