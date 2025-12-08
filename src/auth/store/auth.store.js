
import { create } from 'zustand'
import { loginAction } from '../actions/login.actions';
import { jwtDecode } from "jwt-decode";
import {checkAuthAction } from '../actions/check-auth.actions';
import { registerAction } from '../actions/register.actions';

export const useAuthStore = create((set,get) => ({
  user:null,
  token: null,
  email:null,
  rol:null,
  authStatus:"por-chequear",

  isAdmin:()=>{
    const rol=get().rol || []
    return rol.includes("ADMIN");
  },


  register:async(nombre, correo,clave)=>{
    try {

      await registerAction(nombre, correo,clave)
      return true
      
    } catch (error) {
      return false;
    }

  },


  login: async (correo, clave) => {
    try {
      const data = await loginAction(correo, clave);
    

      const payload = jwtDecode(data.token);

      set({user:payload.nombre,email:payload.sub, token:data.token,rol:payload.rol,authStatus:"autenticado"})

      return true;
    } catch (error) {
      localStorage.removeItem("token");
       set({user:null,token: null,email:null,rol:null, authStatus:"no-autenticado"});
      return false;

      
    }
  }, 

  logout: ()=>{
    localStorage.removeItem("token")
    set({user:null,token: null,email:null,rol:null,authStatus:"no-autenticado"});
  }, 


  refrescarToken:async()=>{
    try {
  
      const data = await checkAuthAction()
      const payload = jwtDecode(data.token)
      
      set({user:payload.nombre,email:payload.sub, token:data.token,rol:payload.rol, authStatus:"autenticado"})
      return true

    } catch (error) {
      set({user:null,token: null,email:null, rol:null,authStatus:"no-autenticado"});
      console.log({error})
      return false;
    }
  }


}))