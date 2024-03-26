import { useContext } from "react";
import "./checkout-item.styles.scss";

import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;

  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const clearItemFromCartHandler = () => clearItemFromCart(cartItem);
  const addItemToCartHandler = () => addItemToCart(cartItem);
  const removeItemFromCartHandler = () => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <img className="image-container" src={imageUrl} alt={name}></img>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span onClick={clearItemFromCartHandler} className="remove-button">
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
