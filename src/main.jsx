import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { UserProvider } from "./Contexts/User.jsx";
import { ProductsProvider } from "./Contexts/Products.jsx";

import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* We wrap the App in the UserProvider to allow all children components access */}
      <UserProvider>
        {/* We wrap the App in the ProductsProvider to allow all children components access */}
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
