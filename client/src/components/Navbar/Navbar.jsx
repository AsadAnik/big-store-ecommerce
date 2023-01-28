import { useEffect } from 'react';
import SearchBar from '../Search/Search';
import { FcHome, FcMultipleSmartphones, FcAbout, FcBriefcase, FcManager } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, logout } from '../../redux/actions/userAction';
import { useAlert } from 'react-alert';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const Alert = useAlert();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  // Handle the Logout CLick here..
  const logoutClick = () => {
    dispatch(logout());
    Alert.success("Logout Successfully");
  };

  console.log(user);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#" style={{ fontFamily: "cursive" }}>BiG StOre</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" style={{ justifyContent: 'space-between' }} id="navbarSupportedContent">
          <div>
            <SearchBar />
          </div>

          <div className="navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  <FcHome size={25} />
                  <span>Home</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  <FcMultipleSmartphones size={25} />
                  <span>Products</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                {
                  cartItems && 
                    cartItems.length > 0 &&
                    <span className="badge badge-danger text-light cart-badge">{cartItems.length}</span>
                }
                  <FcBriefcase size={25} />
                  <span>Cart</span>
                </Link>
              </li>

              {/* <li className="nav-item">
                <a className="nav-link" href="#resources">
                  <FcAbout size={25} />
                  <span>About</span>
                </a>
              </li> */}

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FcManager size={25} />
                  <span>Profile</span>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to={'/account'} className="dropdown-item">Account</Link></li>
                  <li><Link to={'/orders'} className="dropdown-item">Order</Link></li>
                  {
                    isAuthenticated ? 
                      user.role === "admin" && (
                        <li><Link to={'/admin/dashboard'} className="dropdown-item">Dashboard</Link></li>
                      )
                    : null
                  }
                  <li><hr className="dropdown-divider" /></li>
                  {
                    !isAuthenticated ? (
                      <li><Link to={'/login'} className="dropdown-item">Login & Register</Link></li>
                    ) : (
                      <li><Link onClick={logoutClick} className="dropdown-item">Logout</Link></li>
                    )
                  }
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;