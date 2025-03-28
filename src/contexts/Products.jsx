import { useState, createContext, useEffect } from "react";
import PRODUCTS from "../shop_data.json";

export const ProductsContext = createContext({
  products: [], // Default value
  setProducts: () => null, // Default setter function
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products, setProducts };

  useEffect(() => {
    // Fetch products from import
    const fetchProducts = () => {
      setProducts(PRODUCTS);
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
