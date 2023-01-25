import React, { useState, useEffect } from 'react';
import "./LoginSignup.css";
import { Link } from 'react-router-dom';
import { FcBusinessman } from 'react-icons/fc';
import { register, clearErrors } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/widgets/Loading/Loading';


export default function Register() {
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        repassword: '',
        avatar: '',
    });
    const [avatarPreview, setAvatarPreview] = useState('');
    const dispatch = useDispatch();
    const Alert = useAlert();
    const { loading, isAuthenticated, error } = useSelector((state) => state.user);
    const navigate = useNavigate();


    // The useEffect Hook..
    useEffect(() => {
        if (error) {
            Alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate("/account");
        }
    }, [dispatch, error, Alert, isAuthenticated, navigate]);


    // Handle When Change ...
    const handleOnChange = (event) => {
        if (event.target.name === "avatar") {
            setSignupData({ ...signupData, avatar: event.target.files[0] });

            const fileReader = new FileReader();
            fileReader.onload = () => {
                // readyState - 0 = Initial, 1 = Processing, and 2 = Done..
                // if (fileReader.readyState === 1) {
                //     setLoading({ avatarPreviewLoading: true });
                // }

                if (fileReader.readyState === 2) {
                    setAvatarPreview(fileReader.result);
                    // setSignupData({ ...signupData, avatar: fileReader.result });
                    // setSignupData({ ...signupData, avatar: event.target.files[0] });
                }
            };
            fileReader.readAsDataURL(event.target.files[0]);

        } else {
            setSignupData({
                ...signupData,
                [event.target.name]: event.target.value
            });
        }
    };

    // Submit Handle..
    const handleSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();
        myForm.set("name", signupData.name);
        myForm.set("email", signupData.email);
        myForm.set("password", signupData.password);
        myForm.set("avatar", signupData.avatar);

        // console.log("Image -- ", signupData.avatar);
        dispatch(register(myForm));
    };

    if (!loading) {
        return (
            <>
                {/*------------------ Login and Register Form ----------------------*/}
                <section id="login-register" className="mt-5 mb-5">
                    <div className="container">
                        <div className="formContainer">
                            <div className="row form-row d-flex">
                                {/*--------- Register Section -----------*/}
                                <div className="register-section-2">
                                    <form onSubmit={handleSubmit} className="form-section" style={{ marginRight: '2rem' }}>
                                        {/* Form Label */}
                                        <div className="form-label">
                                            <h1 className="text-capitalize mb-4">register now !</h1>
                                        </div>

                                        {/* ------ Image Preview ------ */}
                                        {
                                            !avatarPreview ? (
                                                <div className="form-group text-center">
                                                    <FcBusinessman size={100} />
                                                </div>
                                            ) : (
                                                <div className="form-group">
                                                    <img
                                                        src={avatarPreview}
                                                        alt="Avatar Preview"
                                                        className="avatar-preview-img"
                                                    />
                                                </div>
                                            )
                                        }

                                        {/* Name On Register */}
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                name="name"
                                                onChange={handleOnChange}
                                            />
                                        </div>

                                        {/* Email On Register */}
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                name="email"
                                                onChange={handleOnChange}
                                            />
                                        </div>

                                        {/* Password On Register */}
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                name="password"
                                                onChange={handleOnChange}
                                            />
                                        </div>

                                        {/* Re_Password On Register */}
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Re-password"
                                                name="repassword"
                                                onChange={handleOnChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                className="form-control"
                                                onChange={handleOnChange}
                                            />
                                        </div>

                                        {/* Register Button */}
                                        <button type="submit" className="btn register-btn">Register</button>
                                    </form>
                                </div>


                                {/*---------- Login Div Column -------*/}
                                <div className="login-section-2 ml-2 mr-4">
                                    <div className="form-section" style={{ marginLeft: '2rem' }}>
                                        {/* Labels for Login */}
                                        <div className="form-label">
                                            <h1 className="text-capitalize">already have an account ?</h1>
                                        </div>
                                        <div className="form-label mt-4 mb-4">
                                            <p>
                                                Go to login section to login now. If you are have already an account. You can know our users login &amp;
                                                register policy. And follow our terms (Changing Or Accessing Your Information) of user registration &amp;
                                                login from here: <mark><a href="termsPolicy.html" target="_blank">termsPolicy@BigStore.bd</a></mark>
                                            </p>
                                        </div>
                                        {/* Button for Submit Login */}
                                        {/* <a href="loginRegister.html" className="btn login-btn">Go For Login</a> */}
                                        <Link to={"/login"} className="btn login-btn">Go For Login</Link>
                                    </div>
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
