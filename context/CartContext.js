import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // FUNCIÓN INTELIGENTE PARA AGREGAR
  const addToCart = (product) => {
    setCart((prevCart) => {
      // 1. Buscamos si el producto ya está en el carrito
      const itemExistente = prevCart.find((item) => item.id === product.id);

      if (itemExistente) {
        // 2. Si existe, mapeamos el carrito y sumamos +1 a la cantidad de ese item
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      // 3. Si no existe, lo agregamos con cantidad inicial de 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // FUNCIÓN PARA DISMINUIR O QUITAR
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === productId);

      if (itemExistente.quantity > 1) {
        // Si hay más de uno, restamos 1
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      // Si solo quedaba uno, lo eliminamos de la lista
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);