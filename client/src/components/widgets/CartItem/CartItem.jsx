import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, removeCartItem }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ${item.price} BDT`}</span>
        <p onClick={() => removeCartItem(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;