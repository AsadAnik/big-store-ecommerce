import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Shipping.css";
import MetaData from '../../MetaData';
import { Country, State } from 'country-state-city';
import {
    Home as HomeIcon,
    LocationCity as LocationCityIcon,
    PinDrop as PinDropIcon,
    Phone as PhoneIcon,
    Public as PublicIcon,
    TransferWithinAStation as TransferWithinAStationIcon,
} from '@mui/icons-material';
import { useAlert } from 'react-alert';
import { saveShippingInfo } from '../../redux/actions/cartAction';
import CheckoutSteps from '../../components/widgets/CheckoutSteps/CheckoutSteps';


export default function Shipping() {
    const dispatch = useDispatch();
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const Alert = useAlert();

    // Shipping Informations..
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    useEffect(() => {
        if (!isAuthenticated || !cartItems.length) {
            navigate("/login");
        }
    }, [isAuthenticated, cartItems]);


    // Shipping Submit Data...
    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 11 || phoneNo.length > 11) {
            Alert.error("Phone Number should be 11 digits Long");
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
        navigate("/order/confirm");
    };


    // Returning Statement..
    return (
        <>
            <MetaData title={"Shipping | Big Store"} />

            <div className="mt-4 mb-4">
                <CheckoutSteps activeStep={0} />
            </div>

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <PublicIcon />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div>
                                <TransferWithinAStationIcon />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />

                    </form>
                </div>
            </div >
        </>
    )
}
