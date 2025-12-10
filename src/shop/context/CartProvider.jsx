import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../../auth/store/auth.store";
import { CartContext } from "./CartContext";

// Este componente envuelve a toda la aplicación y provee el estado global del carrito.
// Aquí vive:
// - la lista de productos del carrito
// - las funciones para agregar, quitar y modificar cantidades
// - la persistencia del carrito por usuario (localStorage)
// - los totales (items y precio)
export const CartProvider = ({ children }) => {
  // El carrito solo se gestiona si el usuario está autenticado Y tiene email.
  const { email, authStatus } = useAuthStore();

  const isLogged = authStatus === "autenticado" && !!email;

  // Cada usuario tiene su propio carrito guardado en localStorage.
  // Ejemplo: cart_usuario@gmail.com
  const storageKey = isLogged ? `cart_${email}` : null;

  // Estado interno donde guardamos los items del carrito.
  const [items, setItems] = useState([]);

  // Cargar el carrito desde localStorage cuando el usuario inicia sesión
  useEffect(() => {
    if (!isLogged || !storageKey) {
      // Si NO está logueado, dejamos el carrito vacío.
      // Importante: evitamos mostrar carritos de otros usuarios.
      setItems([]);
      return;
    }

    try {
      // Intentamos leer el carrito guardado en localStorage
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        setItems(JSON.parse(raw));
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Error leyendo carrito de localStorage", error);
      setItems([]);
    }
  }, [isLogged, storageKey]);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (!isLogged || !storageKey) return;

    try {
      if (items && items.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(items));
      }
    } catch (error) {
      console.error("Error guardando carrito en localStorage", error);
    }
  }, [items, isLogged, storageKey]);

  //Función: Agregar producto al carrito
  const addToCart = (product) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.id === product.id);
      // Si ya existe, aumentamos la cantidad
      if (exist) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      // Si no existe, lo agregamos como nuevo con cantidad 1
      return [
        ...prev,
        {
          id: product.id,
          modelo: product.modelo,
          precio: product.precio,
          imagenUrl: product.imagenUrl,
          cantidad: 1,
        },
      ];
    });
  };

  // Función: Quitar un producto completamente del carrito
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Función: Modificar la cantidad (+1 o -1)
  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + delta } : i))
        .filter((i) => i.cantidad > 0)
    );
  };

  //Función: Vaciar completamente el carrito del usuario
  const clearCart = (storageKey) => {
    setItems([]);
    localStorage.setItem(storageKey, []);
  };

  //  Total de unidades en el carrito (sumatoria de cantidades)
  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad, 0),
    [items]
  );

  // Calcular Total en pesos
  const totalPrice = useMemo(
    () => items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
    [items]
  );

  // Este objeto se expondrá a toda la app mediante CartContext.Provider
  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isLogged,
  };

  // Envolvemos a la app con el provider
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
