import React, { useEffect, useState } from 'react';
import "./AddProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { getProductDetails, updateProduct, clearErrors } from '../../../redux/actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../../redux/constants/productConstants';
import { Button } from "@mui/material";
import MetaData from '../../../MetaData';
import {
  AccountTree as AccountTreeIcon,
  Description as DescriptionIcon,
  Storage as StorageIcon,
  Spellcheck as SpellcheckIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import SideBar from '../Sidebar/Sidebar';


// Product Update Comp..
export default function ProductUpdate() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0,
    images: [],
    oldImages: [],
    imagesPreview: [],
  });

  // console.log("PRODUCT -->> ", product);

  const categories = ["Laptop", "Mobile", "Tablet", "Desktop", "Gadgets", "Camera"];

  // useEffect Hook..
  useEffect(() => {
    if (product && product._id !== params.productId) {
      dispatch(getProductDetails(params.productId));
    } else {
      setProductData({
        ...productData,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        stock: product.stock,
        oldImages: product.images
      });
    }

    if (error) {
      Alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      Alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      Alert.success("Product Updated Successfully!");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

  }, [dispatch, Alert, navigate, error, isUpdated, params.productId, product, updateError]);


  // Handle Image onChange..
  const updateProductImageChange = (event) => {
    const files = Array.from(event.target.files);

    setProductData({
      ...productData,
      images: [],
      imagesPreview: [],
      oldImages: [],
    });

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductData({
            ...productData,
            imagesPreview: (old) => [...old, reader.result],
            images: (old) => [...old, reader.result],
          });
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // Handle Submit Form Update..
  const handleUpdateProductSubmit = (event) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set("name", productData.name);
    myForm.set("price", productData.price);
    myForm.set("description", productData.description);
    myForm.set("category", productData.category);
    myForm.set("stock", productData.stock);

    productData.images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(params.productId, myForm));
  };

  return (
    <>
      <MetaData title="Create Product" />

      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={handleUpdateProductSubmit}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={productData.name}
                onChange={(event) => setProductData({...productData, name: event.target.value})}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(event) => setProductData({...productData, price: event.target.value})}
                value={productData.price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={productData.description}
                onChange={(event) => setProductData({...productData, description: event.target.value})}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={productData.category}
                onChange={(event) => setProductData({...productData, category: event.target.value})}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
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
                onChange={(event) => setProductData({...productData, stock: event.target.value})}
                value={productData.stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImageChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {productData.oldImages &&
                productData.oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {productData.imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
