import React, { useEffect, useState } from 'react';
import "./AddProduct.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProductAdmin } from '../../../redux/actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../../../MetaData';
import {
    AccountTree as AccountTreeIcon,
    Description as DescriptionIcon,
    Storage as StorageIcon,
    Spellcheck as SpellcheckIcon,
    AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import Sidebar from '../Sidebar/Sidebar';
import { NEW_PRODUCT_RESET } from '../../../redux/constants/productConstants';
import { useNavigate } from 'react-router-dom';


// Product Create Component..
export default function ProductCreact() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Alert = useAlert();
    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [productData, setProductData] = useState({
        name: '',
        price: null,
        description: '',
        category: '',
        stock: null,
        images: [],
        imagesPreview: [],
    });

    const categories = ["Laptop", "Mobile", "Tablet", "Desktop", "Gadgets", "Camera"];


    useEffect(() => {
        if (error) {
            Alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            Alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, Alert, error, navigate, success]);


    // Handle Text Field Change..
    const handleTextFieldChange = (event) => {
        const { value, name } = event.target;

        setProductData({
            ...productData,
            [name]: value,
        });
    };


    // Products Image onChange..
    const handleProductImageChange = (event) => {
        const files = Array.from(event.target.files);
        setProductData({ ...productData, images: [], imagesPreview: [] });

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProductData({
                        ...productData,
                        images: [...productData.images, reader.result],
                        imagesPreview: [...productData.imagesPreview, reader.result],
                    });
                }
            };

            reader.readAsDataURL(file);
        });
    };


    // Handle Create Product Submit Button..
    const handleCreateProductSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();
        myForm.set('name', productData.name);
        myForm.set('price', productData.price);
        myForm.set('description', productData.description);
        myForm.set('category', productData.category);
        myForm.set('stock', productData.stock);

        productData.images.forEach((image) => {
            myForm.append('images', image);
        });

        // To see what is storing..
        // console.log("Form data contents:");
        // for (const [key, value] of myForm.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        dispatch(createProductAdmin(myForm));
    };

    // returning for this component..
    return (
        <>
            <MetaData title={"Product Create"} />

            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={handleCreateProductSubmit}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={productData.name}
                                name="name"
                                onChange={handleTextFieldChange}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={productData.price}
                                name="price"
                                onChange={handleTextFieldChange}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={productData.description}
                                onChange={handleTextFieldChange}
                                name="description"
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={handleTextFieldChange}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate} name="category">
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                value={productData.stock}
                                name="stock"
                                onChange={handleTextFieldChange}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                onChange={handleProductImageChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {productData?.imagesPreview?.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
