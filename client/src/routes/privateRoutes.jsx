import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../redux/actions/userAction';
import { Outlet, Navigate } from 'react-router-dom';

export default function privateRoutes(props) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    // When Login Or Register Heats..
    if (!props.isAccount) {
        if (isAuthenticated === false) {
            return <Outlet {...props} />;
        }
        if (isAuthenticated === true) {
            return <Navigate to={'/account'} />;
        }
    }

    // When User Account Heats..
    if (props.isAccount) {
        if (isAuthenticated === false) {
            return <Navigate to={'/login'} />;
        }
        if (isAuthenticated === true) {
            return <Outlet {...props} />;
        }
    }

    return <Outlet {...props} />;
}
