import React, { useEffect } from 'react';
import "./MyOrders.css";
import { Launch as LaunchIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { myOrders, clearErrors } from '../../redux/actions/orderAction';
import { useNavigate, Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../../MetaData';
import Loading from '../../components/widgets/Loading/Loading';


export default function MyOrders() {
  const { orders, loading, error } = useSelector((state) => state.myOrders);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const Alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);


  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        const status = params.getValue(params.id, "status");

        switch (status) {
          case "Delivered":
            return "text-success";
          case "Processing":
            return "text-warning";
          default: 
            return "text-danger";
        }
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 170,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "action",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    }
  ];

  let rows = [];

  // Orders Adding to the Row..
  if (orders) {
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });
  }


  if (!loading) {
    return (
      <>
        <MetaData title={`${user.name} - Orders | Big Store`} />
        <div className="myOrdersPage mb-5 mt-4">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
          // rowsPerPageOptions={[5]}
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      </>
    )
  } else {
    return <Loading />;
  }
}
