import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  // Existing product
  if (existingCartItem) {
    // We always want to return a new array - dont mutate the original
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // New product
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id;
  });

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  } else {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

// Initialize the values portion of the state
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotla: 0,
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  // Get the state values
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  // Create value that will be passed via context
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
