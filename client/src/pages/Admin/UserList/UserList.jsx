import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "../ProductList/ProductList.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../../../MetaData';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Sidebar from '../Sidebar/Sidebar';
import { getAllUsers, clearErrors, deleteUser } from '../../../redux/actions/userAction';
import { DELETE_USER_RESET } from '../../../redux/constants/userConstants';


// User List Component..
export default function UserList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Alert = useAlert();
    const { error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.account);


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
            Alert.success(message);
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, Alert, error, deleteError, navigate, isDeleted, message]);


    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    };


    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
        { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
        { field: "role", headerName: "Role", minWidth: 150, flex: 0.3, cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin" ? 'text-success' : 'text-warning'
        }},
        { field: "action", flex: 0.3, headerName: "Actions", minWidth: 150, type: "number", sortable: false, renderCell: (params) => {
            return (
                <>
                    <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>

                    <Button
                        onClick={() => handleDeleteUser(params.getValue(params.id, "id"))}
                    >
                        <DeleteIcon />
                    </Button>
                </>
            );
        }}
    ];

    const rows = [];

    users && 
        users.forEach((user) => {
            rows.push({
                id: user._id,
                role: user.role,
                email: user.email,
                name: user.name,
            })
        })

  return (
    <>
        <MetaData title={`All Users | Admin`} />

        <div className="dashboard">
            <Sidebar />

            <div className="productListContainer">
                <h1 id="productListHeading">ALL USERS</h1>

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
