import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import Product from '../pages/Product/Product';

import Cart from '../pages/Cart/Cart';
import Shipping from '../pages/Order/Shipping';
import ConfirmOrder from '../pages/Order/ConfirmOrder';
import Payment from '../pages/Order/Payment';
import SuccessOrder from '../pages/Order/OrderSuccess';
import MyOrders from '../pages/Order/MyOrders';
import OrderDetails from '../pages/Order/OrderDetails';

import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import Account from '../pages/User/Account';
import UpdateAccount from '../pages/User/UpdateAccount';
import PasswordUpdate from '../pages/User/PasswordUpdate';

import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import AdminProductList from '../pages/Admin/ProductList/ProductList';


export default function publicRoutes() {
    const [stripeApiKey, setStripeApiKey] = useState('');

    // To Getting and Setting Stripe API Key..
    const getStripeApiKey = async () => {
        // -------- CONFIG For All CORS Allows and Types of Headers and Credentials ------
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": `${API_URL}`
            },
            withCredentials: true,
            mode: 'cors',
        };
        const { data } = await axios.get(`${API_URL}/payment/stripeApiKey`, config);
        // console.log("DATA == ", data);
        setStripeApiKey(data.stripeApiKey);
    };

    useEffect(() => {
        getStripeApiKey();
    }, []);

    console.log("Stripe API Key", stripeApiKey);


    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/product/:productId" element={<Product />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />

            {/* ---- User Login Register With Private Route ---- */}
            <Route path="/login" element={<PrivateRoute isAccount={false} />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/register" element={<PrivateRoute isAccount={false} />}>
                <Route path="/register" element={<Register />} />
            </Route>

            {/* ---- User Profile / Account ---- */}
            <Route path="/account" element={<PrivateRoute isAccount={true} />}>
                <Route path="/account" element={<Account />} />
            </Route>

            {/* ----- User Profile / Account Edit Or Update ----- */}
            <Route path="/account/edit" element={<PrivateRoute isAccount={true} />}>
                <Route path="/account/edit" element={<UpdateAccount />} />
            </Route>

            {/* ----- User Password Update / Change ----- */}
            <Route path="/password/update" element={<PrivateRoute isAccount={true} />}>
                <Route path="/password/update" element={<PasswordUpdate />} />
            </Route>

            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<PrivateRoute isAccount={true} />}>
                <Route path="/order/confirm" element={<ConfirmOrder />} />
            </Route>

            {/* -----  Wrapping with Stripe Loader with Stripe API Key ----- */}
            {stripeApiKey &&
                <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
            }

            {/* ---- Order System ---- */}
            <Route path="/success" element={<PrivateRoute isAccount={true} />}>
                <Route path="/success" element={<SuccessOrder />} />
            </Route>
            <Route path="/orders" element={<PrivateRoute isAccount={true} />}>
                <Route path="/orders" element={<MyOrders />} />
            </Route>

            <Route path="/order/:id" element={<PrivateRoute isAccount={true} />}>
                <Route path="/order/:id" element={<OrderDetails />} />
            </Route>

            {/* ----- Admin Dashboard And Admin Routes ---- */}
            <Route path="/admin/dashboard" element={<PrivateRoute isAdmin={true} />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/admin/products" element={<PrivateRoute isAdmin={true} />}>
                <Route path="/admin/products" element={<AdminProductList />} />
            </Route>
        </Routes>
    )
}
