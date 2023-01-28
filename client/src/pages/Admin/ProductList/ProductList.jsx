import React, { useEffect } from 'react';
import MetaData from '../../../MetaData';
import Sidebar from '../Sidebar/Sidebar';
import "./ProductList.css";
import { DataGrid } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { getAdminProducts, clearErrors, deleteProduct  } from '../../../redux/actions/productAction';


// Product List...
export default function ProductList() {
    const dispatch = useDispatch();
    const Alert = useAlert();
    const navigate = useNavigate();

    const { error, products  } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product); 

    // useEffect Hook..
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
            Alert.success("Product Deleted Successfully");
            navigate('/admin/dashboard');
        }

        dispatch(getAdminProducts());
    }, [dispatch, Alert, error, deleteError, navigate, isDeleted]);


    // Delete handler Function..
    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId));
    };

    // Items for DataGrid Here..
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
        { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", minWidth: 270, flex: 0.5 },
        { field: "actions", headerName: "Actions", minWidth: 150, type: "number", sortable: false, 
        renderCell: (params) => {
            return (
                <>
                    <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>

                    <Button onClick={() => handleDeleteProduct(params.getValue(params.id, "id"))}>
                        <DeleteIcon />
                    </Button>
                </>
            );
        } }
    ];

    const rows = [];

    if (products) {
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });
    }

    return (
        <>
            <MetaData title="Dashboard - Admin Panel" />
            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h3 id="productListHeading">ALL PRODUCTS</h3>

                    <DataGrid 
                        className="productListTable"
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}
