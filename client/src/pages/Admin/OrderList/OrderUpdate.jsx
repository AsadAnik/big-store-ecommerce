import React, { useEffect, useState } from 'react';
import "./OrderUpdate.css";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../../../MetaData';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import { orderDetails, clearErrors, updateOrder } from '../../../redux/actions/orderAction';
import Loading from '../../../components/widgets/Loading/Loading';
import { AccountTree as AccountTreeIcon } from '@mui/icons-material';
import { UPDATE_ORDER_RESET } from '../../../redux/constants/orderConstants';


// Order Update Component..
export default function OrderUpdate() {
    const dispatch = useDispatch();
    const Alert = useAlert();
    const params = useParams();
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    const [status, setStatus] = useState("");

    // useEffect..
    useEffect(() => {
        if (error) {
            Alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            Alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            Alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(orderDetails(params.orderId));
    }, [dispatch, Alert, error, params.orderId, isUpdated, updateError]);


    // Order Update Then Submit Handle..
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(params.orderId, myForm));
    };


    // Return Component..
    return (
        <>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <Sidebar />

                <div className="newProductContainer">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="confirmOrderPage" style={{ display: order.orderStatus === "Delivered" ? "block" : "grid" }}>
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "text-success" : "text-danger"}>
                                                {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={order.orderStatus && order.orderStatus === "Delivered" ? "text-success" : "text-danger"}>
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                                                    <span>{item.quantity} X {item.price} BDT ={" "}<b>{item.price * item.quantity} BDT</b></span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                
                            <div style={{ display: order.orderStatus === "Delivered" ? "none" : "block" }}>
                                <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTreeIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={loading ? true : false || status === "" ? true : false}
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
