import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";
import { CustomFooter } from "../components/CustomFooter";

// Este layout define la estructura visual de todas las páginas de la tienda.
// Básicamente, todo lo que esté bajo la ruta principal cargará este diseno
export const ShopLayout = () => {
  return (
    <div className=" container-fluid container-md vh-100 d-flex flex-column  gap-5">
      {
        // Encabezado de la tienda (logo, menú, carrito, login, etc.)
      }
      <CustomHeader />

      {
        // Outlet es un componente especial de react-router. Aquí se renderiza la página hija que corresponda según la URL. Por ejemplo: HomePage, Checkout, Profile, etc.
        /* 
          Por ejemplo:
          "/" → HomePage
          "/checkout/address" → CheckoutAddressPage
          "/profile" → ProfilePage
      */
      }
      <Outlet />

      {
        // Pie de página con información de contacto y enlaces.
      }
      <CustomFooter />
    </div>
  );
};
