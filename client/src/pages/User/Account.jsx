import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../MetaData";
import Loading from "../../components/widgets/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { FcManager } from 'react-icons/fc';
import "./Account.css";

const Account = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {user.avatar ? (
                <img src={user?.avatar?.url} alt={user.name} />
              ): (
                <FcManager size={200} />
              )}
              <Link to={'/account/edit'}>Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to={'/orders'}>My Orders</Link>
                <Link to={'/password/update'}>Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;