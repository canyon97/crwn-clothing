import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  const shopDataElements = products.map((product) => (
    <ProductCard key={product.id} product={product}></ProductCard>
  ));
  return <div className="products-container">{shopDataElements}</div>;
};

export default Shop;
