import React, { useState, useEffect } from 'react';
import "./UpdateAccount.css";
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { FcBusinessman } from 'react-icons/fc';
import { updateAccount, clearErrors, loadUser } from '../../redux/actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/widgets/Loading/Loading';
import MetaData from '../../MetaData';


export default function UpdateAccount() {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.account);
  const [signupData, setSignupData] = useState({
    name: user.name,
    email: user.email,
    avatar: '',
  });
  const [avatarPreview, setAvatarPreview] = useState(user.avatar && user.avatar.url);
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
      Alert.success("Account Updated Successfully");
      dispatch(loadUser());
      
      navigate("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, Alert, navigate, isUpdated]);


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
    myForm.set("avatar", signupData.avatar);
    dispatch(updateAccount(myForm));
  };

  if (!loading) {
    return (
      <>
        <MetaData title={"Update Account | Big Store"} />

        {/*------------------ Edit / Update Account ----------------------*/}
        <section id="update-account" className="mt-5 mb-5">
          <div className="container">
            <div className="formContainer">
              <div className="row update-form-row d-flex">
                {/*--------- Register Section -----------*/}
                <div className="update-account-section">
                  <form onSubmit={handleSubmit} className="form-section" style={{ marginRight: '2rem' }}>
                    {/* Form Label */}
                    <div className="form-label">
                      <h1 className="text-capitalize mb-4">update account !</h1>
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
                        value={signupData.name}
                        onChange={handleOnChange}
                      />
                    </div>

                    {/* Email On Register */}
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={signupData.email}
                        name="email"
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
                    <button type="submit" className="btn update-btn">Update</button>
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
