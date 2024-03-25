import { createContext, useState } from "react";

// Initialize the values portion of the state
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  // Get the state values
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Create value that will be passed via context
  const value = {
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
