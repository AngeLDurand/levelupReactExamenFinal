import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

// Importamos StrictMode, una herramienta de React que ayuda a detectar posibles problemas durante el desarrollo.

// createRoot es el nuevo método de React 18 para arrancar la aplicación

// Buscamos en el HTML el elemento con id "root" y le decimos a React que ahí dentro va a "pintar" toda la aplicación.

//App es el punto de entrada real de nuestra aplicación React.Todo el resto de páginas y componentes cuelgan de aquí

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
