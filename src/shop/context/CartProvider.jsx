import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../../auth/store/auth.store";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const { email, authStatus } = useAuthStore();

  const isLogged = authStatus === "autenticado" && !!email;
  const storageKey = isLogged ? `cart_${email}` : null;

  const [items, setItems] = useState([]);

  // Cargar carrito desde localStorage solo si está logueado
  useEffect(() => {
    if (!isLogged || !storageKey) {
      // si NO está logueado, dejamos el carrito vacío (y sin persistir)
      setItems([]);
      return;
    }

    try {
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

  // Guardar carrito en localStorage solo si está logueado
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

  const addToCart = (product) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.id === product.id);
      if (exist) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
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

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + delta } : i))
        .filter((i) => i.cantidad > 0)
    );
  };

  const clearCart = (storageKey) => {
    setItems([]);
    localStorage.setItem(storageKey, []);
  };

  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
    [items]
  );

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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
