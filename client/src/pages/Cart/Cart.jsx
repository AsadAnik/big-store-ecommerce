import React from 'react';
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { FcEmptyBattery } from 'react-icons/fc';
import { Typography } from '@mui/material';
import CartItem from '../../components/widgets/CartItem/CartItem';
import { addItemsToCart, removeFromCart } from '../../redux/actions/cartAction';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../MetaData';


export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // Increment Or Decrement for Quantity..
  const controlQuantity = (type, id, quantity, stock) => {
    if (type === "INCREMENT") {
      const newQuantity = quantity + 1;
      if (stock <= quantity) return;
      dispatch(addItemsToCart(id, newQuantity));
    }

    if (type === "DECREMENT") {
      const newQuantity = quantity - 1;
      if (1 >= quantity) return;
      dispatch(addItemsToCart(id, newQuantity));
    }
  };

  // Remove From Cart Handler Function..
  const removeCartItem = (id) => {
    dispatch(removeFromCart(id));
  };

  // Checkout Handle When Click..
  const handleCheckOut = () => {
    navigate("/shipping");
  };


  // The Conditional Rendering here..
  if (cartItems.length === 0) {
    return (
      <>
        <MetaData title={"Empty Cart | Big Store"} />
        <div className="emptyCart">
          <FcEmptyBattery size={100} />

          <Typography className="mb-3 text-muted">No Products in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <MetaData title={"Cart | Big Store"} />
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {
            cartItems &&
            cartItems.map(item => (
              <div className="cartContainer" key={item.product}>
                <CartItem item={item} removeCartItem={removeCartItem} />

                <div className="cartInput">
                  <button onClick={() => controlQuantity("DECREMENT", item.product, item.quantity)}>-</button>
                  <input type="number" value={item.quantity} readOnly />
                  <button onClick={() => controlQuantity("INCREMENT", item.product, item.quantity, item.stock)}>+</button>
                </div>

                <p className="cartSubtotal">{`${item.price * item.quantity} BDT`}</p>
              </div>
            ))
          }

          <div className="cartGrossProfit">
            <div></div>

            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)} BDT`}</p>
            </div>

            <div></div>

            <div className="checkOutBtn">
              <button onClick={handleCheckOut}>Check Out</button>
            </div>



          </div>
        </div>
      </>
    );
  }
};
