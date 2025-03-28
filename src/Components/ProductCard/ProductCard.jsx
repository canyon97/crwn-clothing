import "./ProductCard.scss";
import Button from "../Button/Button";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  return (
      <div className="product-card-container">
        <img src={imageUrl} alt={name}/>
        <div className="footer">
          <h2 className="name">{name}</h2>
          <p className="price">{price}</p>
        </div>
        <Button buttonType="inverted">Add to Cart</Button>
      </div>
  );
};

export default ProductCard;
