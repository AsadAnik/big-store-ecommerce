import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "../ProductList/ProductList.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../../../MetaData';
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material';
import Sidebar from '../Sidebar/Sidebar';
import { getAllOrders, deleteOrder, clearErrors } from '../../../redux/actions/orderAction';
import { DELETE_ORDER_RESET } from '../../../redux/constants/orderConstants';


export default function OrderList() {
    const dispatch = useDispatch();
    const Alert = useAlert();
    const navigate = useNavigate();
    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            Alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            Alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            Alert.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, Alert, error, deleteError, navigate, isDeleted]);


    // Delete Handle Function..
    const handleDeleteOrder = (id) => {
        dispatch(deleteOrder(id));
    };


    // Columns & Rows for Data Grid View...
    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
        {
            field: 'status', headerName: 'Status', minWidth: 150, flex: 0.5, cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "text-success" : "text-danger";
            }
        },
        { field: 'itemsQty', headerName: 'Items Qty', type: 'number', minWidth: 150, flex: 0.4 },
        { field: 'amount', headerName: 'Amount', type: 'number', minWidth: 270, flex: 0.5 },
        {
            field: 'actions', headerName: 'Actions', type: 'number', minWidth: 150, sortable: false, renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() => handleDeleteOrder(params.id, "id")}
                        >
                            <DeleteIcon />
                        </Button>
                    </>
                );
            }
        }
    ];

    const rows = [];

    // Push Data to Rows for Viewing into Data Grid...
    orders &&
        orders.forEach((order) => {
            rows.push({
                id: order._id,
                itemsQty: order.orderItems.length,
                amount: order.totalPrice,
                status: order.orderStatus,
            });
        });


    return (
        <>
            <MetaData title={`Orders List | Admin`} />

            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h3 id="productListHeading">ALL ORDERS</h3>

                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}
