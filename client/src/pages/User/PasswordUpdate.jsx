import React, { useState, useEffect } from 'react';
import "./PasswordUpdate.css";
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { passwordUpdate, clearErrors, loadUser } from '../../redux/actions/userAction';
import { PASSWORD_UPDATE_RESET } from '../../redux/constants/userConstants';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/widgets/Loading/Loading';
import MetaData from '../../MetaData';


export default function PasswordUpdate() {
  const { loading, error, isUpdated } = useSelector((state) => state.account);
  const [passData, setPassData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const Alert = useAlert();
  const navigate = useNavigate();


  // The useEffect Hook..
  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      Alert.success("Changed Password Successfully");
      dispatch(loadUser());
      
      navigate("/account");
      dispatch({ type: PASSWORD_UPDATE_RESET });
    }
  }, [dispatch, error, Alert, navigate, isUpdated]);


  // Handle When Change ...
  const handleOnChange = (event) => {
      setPassData({
        ...passData,
        [event.target.name]: event.target.value
      });
  };

  // Submit Handle..
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(passwordUpdate(passData));
  };

  if (!loading) {
    return (
      <>
        <MetaData title={"Change Password | Big Store"} />

        {/*------------------ Edit / Update Password ----------------------*/}
        <section id="update-password" className="mt-5 mb-5">
          <div className="container">
            <div className="formContainer">
              <div className="row update-form-row d-flex">
                {/*--------- Change Password Section -----------*/}
                <div className="update-password-section">
                  <form onSubmit={handleSubmit} className="form-section" style={{ marginRight: '2rem' }}>
                    {/* Form Label */}
                    <div className="form-label">
                      <h1 className="text-capitalize mb-4">Change Password !</h1>
                    </div>

                    {/* Old Password */}
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Old Password"
                        value={passData.oldPassword}
                        name="oldPassword"
                        onChange={handleOnChange}
                      />
                    </div>

                    {/* New Password */}
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        value={passData.newPassword}
                        name="newPassword"
                        onChange={handleOnChange}
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={passData.confirmPassword}
                        name="confirmPassword"
                        onChange={handleOnChange}
                      />
                    </div>

                    {/* Update Password Button */}
                    <button type="submit" className="btn update-pass-btn">Update Password</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </>
    )
  } else {
    return <Loading />;
  }
}
