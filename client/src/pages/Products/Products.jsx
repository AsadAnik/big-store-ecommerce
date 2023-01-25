import React, { useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, clearErrors } from '../../redux/actions/productAction';
import Product from '../../components/Product/Product';
import Loading from '../../components/widgets/Loading/Loading';
import { useParams } from 'react-router-dom';
import PaginationBar from '../../components/widgets/PaginationBar/PaginationBar';
import { Slider, Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import MetaData from '../../MetaData';

// The Static Categories..
const categories = ["All", "Laptop", "Mobile", "Tablet", "Desktop", "Gadgets"];

export default function Products() {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const {
    products,
    productsCount,
    // filteredProductsCount,
    resultPerPage,
    loading,
    error
  } = useSelector((state) => state.products);
  const { keyword } = useParams();
  const [currentPage, setPage] = useState(1);
  const [price, setPrice] = useState([0, 9999999]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  // useEffect Hook..
  useEffect(() => {
    if (error) {
      Alert.alert(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error, Alert]);

  // Pagination Page Change Handle..
  const handleCurrentPageNo = (e) => {
    setPage(e);
  };

  // Range Slider's New Price Setting When Changes..
  const handlePriceChange = (_event, newPrice) => {
    setPrice(newPrice);
  }

  if (!loading) {
    return (
      <>
        {/* ---- Meta Data ---- */}
        <MetaData title={`Products | Big Store`} />

        {
          keyword ?
            <h2 className="products-heading">{keyword}</h2> :
            <h2 className="products-heading">Products</h2>
        }

        <div className="container">
          {/* ------ Products Filter ------ */}
          <div className="filter-box">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChangeCommitted={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={9999999}
            />

            <Typography>Category</Typography>
            <ul className="category-box">
              {categories.map(category => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>

              <Slider
                value={ratings}
                onChange={(_event, newRating) => setRatings(newRating)}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {/* ----- Products Show ------ */}
          <div className="products-wrapper">
            {products && products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>

        {/* ------ Pagination ------ */}
        {resultPerPage < productsCount && (
          <PaginationBar
            currentPage={currentPage}
            resultPerPage={resultPerPage}
            productsCount={productsCount}
            handleCurrentPageNo={handleCurrentPageNo}
          />
        )}
      </>
    );
  } else {
    return <Loading />;
  }
}
