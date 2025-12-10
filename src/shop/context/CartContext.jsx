import { createContext } from "react";

// Importamos createContext, que permite crear un "contexto" global.
// Un contexto sirve para compartir información entre componentes

// Le damos un valor inicial "null" porque el verdadero valor se asignará
// dentro del CartProvider (el componente que envuelve a toda la app).
export const CartContext = createContext(null);
