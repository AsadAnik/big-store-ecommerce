import React, { useEffect, useState } from 'react';
import "./LoginSignup.css";
import { Link, redirect } from 'react-router-dom';
import { login, clearErrors } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import Loading from '../../components/widgets/Loading/Loading';


export default function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const location = useLocation();

  // const redirect = location.search ? location.search.split('=')[1] : "/account";

  // The useEffect Hook..
  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearErrors());
    }
  }, [error]);

  // Handle When Change ...
  const handleOnChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  };

  // Submit Handle..
  const handleSubmit = (event) => {
    event.preventDefault();

    if (loginData.email && loginData.password) {
      dispatch(login(loginData.email, loginData.password));
    }
  };

  
  if (!loading) {
    return (
      <>
        {/*------------------ Login and Register Form ----------------------*/}
        <section id="login-register" className="mt-5 mb-5">
          <div className="container">
            <div className="formContainer">
              <div className="row form-row d-flex">
                {/*---------- Login Div Column -------*/}
                <div className="login-section ml-2 mr-4">
                  <form
                    className="form-section"
                    style={{ marginLeft: '2rem' }}
                    onSubmit={handleSubmit}
                  >
                    {/* Labels for Login */}
                    <div className="form-label">
                      <h1 className="text-capitalize">user login</h1>
                    </div>

                    {/* Email On Login */}
                    <div className="form-group mt-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={loginData.email}
                        onChange={handleOnChange}
                      />
                    </div>

                    {/* Password On Login */}
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleOnChange}
                      />
                    </div>

                    {/* Remember Me Checkbox! */}
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Remember me!</label>
                    </div>

                    {/* Button for Submit Login */}
                    <button type="submit" className="btn login-btn">login</button>
                  </form>
                </div>
                {/*--------- Register Section -----------*/}
                <div className="register-section">
                  <form action className="form-section" style={{ marginRight: '2rem' }}>
                    {/* Form Label */}
                    <div className="form-label">
                      <h1 className="text-capitalize mb-4">register for first time user?</h1>
                      <p className="mb-4">
                        If you havn't any "MaiThai" account, you can register from here. And login with your account. You can
                        follow our terms here: <mark><a href="termsPolicy.html" target="_blank">termsPolicy@BigStore.bd</a></mark>
                      </p>
                    </div>
                    {/* Register Button */}
                    <div className="form-group">
                      {/* Button trigger modal */}
                      {/* <a href="register.html" className="btn btn-lg btn-warning register-btn text-capitalize">
                        continue to register
                      </a> */}

                      <Link to={"/register"} className="btn btn-lg btn-warning register-btn text-capitalize">
                        continue to register
                      </Link>
                    </div>
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
