import React, { useEffect, useRef } from "react";
import axios from "axios";
import "./payment.css";
import CheckoutSteps from "../../components/widgets/CheckoutSteps/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import { createOrder, clearErrors } from "../../redux/actions/orderAction";
import {
    CreditCard as CreditCardIcon,
    Event as EventIcon,
    VpnKey as VpnKeyIcon,
} from '@mui/icons-material';
import { API_URL } from '../../config';
import { useNavigate } from "react-router-dom";



// Payment Component..
export default function Payment() {
    // Get From Session Storage..
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const Alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    // useEffect Hook..
    useEffect(() => {
        if (error) {
            Alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, Alert]);

    // Payment Data..
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    // Order Data..
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice, 
    };

    // Submit Handler Function..
    const submitHandler = async (event) => {
        event.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": `${API_URL}`
                },
                withCredentials: true,
                mode: 'cors',
            };

            const { data } = await axios.post(`${API_URL}/payment/process`, paymentData, config);
            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                Alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    // Dispatching the Order for Ordering..
                    dispatch(createOrder(order));

                    navigate("/success");
                } else {
                    Alert.error("There's some issue while processing payment");
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            Alert.error(error.response.data.message);
        }
    };

    // Returning Statement..
    return (
        <>
            <MetaData title={"Payment | Big Store"} />
            <div className="mt-4 mb-4">
                <CheckoutSteps activeStep={2} />
            </div>

            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(event) => submitHandler(event)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ${orderInfo && orderInfo.totalPrice} BDTK`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    )
}
