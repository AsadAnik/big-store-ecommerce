import React from 'react';
import CheckoutSteps from '../../components/widgets/CheckoutSteps/CheckoutSteps';
import "./ConfirmOrder.css";
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import MetaData from '../../MetaData';


export default function ConfirmOrder() {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;

    // Make Payment Proceed..
    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        // Set The Oder Information to Session Storage..
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    };

    return (
        <>
            <div className="mt-4 mb-4">
                <MetaData title="Confirm Order" />
            </div>

            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage container">
                <div>
                    {/* ----- Shipping Info ----- */}
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>

                    {/* ----- Cart Items ----- */}
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X {item.price} BDTK ={" "}
                                            <b>{item.price * item.quantity} BDTK</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/*  */}
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summery</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>{subtotal} BDTK</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>{shippingCharges} BDTK</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>{tax} BDTK</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>{totalPrice} BDTK</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </>
    )
}
