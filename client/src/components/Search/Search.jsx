import React, { useState } from 'react';
import "./Search.css";
import { FcSearch } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState('');

    // Search At Very First Page..
    const handleSearchKeyChange = (event) => {
        const { value } = event.target;
        setSearchKey(value);

        // if (value.trim()) {
        //     navigate(`/products/${value}`);
        // } else {
        //     navigate('/products/');
        // }
    };

    // onKeyPress or Down Handler..
    const handleEnterKeyPress = (event) => {
        const { value } = event.target;

        if (event.key === "Enter") {
            event.preventDefault();

            if (value.trim()) {
                navigate(`/products/${value}`);
            } else {
                navigate('/products/');
            }
            setSearchKey('');
        }
    };

    // onSubmit Handle..
    const handleSubmit = (event) => {
        event.preventDefault();

        if (searchKey.trim()) {
            navigate(`/products/${searchKey}`);
        } else {
            navigate('/products/');
        }
        setSearchKey('');
    }

    return (
        <form role="search">
            <div className="search-bar-wrapper">
                <input
                    className="me-2 search-bar"
                    type="search"
                    value={searchKey}
                    placeholder="Search Product | (Apple, Samsung, Huawei)"
                    aria-label="Search"
                    onChange={(event) => handleSearchKeyChange(event)}
                    onKeyDown={(event) => handleEnterKeyPress(event)}
                />

                <span
                    className="search-icon"
                    onClick={(event) => handleSubmit(event)}
                >
                    <FcSearch size={25} />
                </span>
            </div>
        </form>
    )
}
