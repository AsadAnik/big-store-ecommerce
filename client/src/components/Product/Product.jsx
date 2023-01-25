import React from 'react';
import "./Product.css";
import { Link } from 'react-router-dom';
import ReviewStars from '../widgets/ReviewStars/ReviewStars';
// import { ReviewStarsMUI } from '../widgets/ReviewStars/ReviewStars';

export default function Product({ product }) {
  return (
    <div className="product">
        <Link className="product-card" to={`/product/${product._id}`}>
            <img className="product-img" src={`${product.images[0].url}`} alt={product.name} />
            <p className="product-name">{product.name}</p>

            <div className="product-rating">
                <ReviewStars ratings={product.ratings} numOfReviews={product.numOfReviews} size={10} />
                {/* <ReviewStarsMUI ratings={product.ratings} numOfReviews={product.numOfReviews} /> */}
            </div>

            <span className="product-price">{product.price} BDTK</span>
        </Link>
    </div>
  )
}
