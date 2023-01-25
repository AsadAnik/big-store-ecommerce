import React, { useEffect, useState } from 'react';
import "./Product.css";
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails, newReview, clearErrors } from '../../redux/actions/productAction';
import { addItemsToCart } from '../../redux/actions/cartAction';
// import ReviewStars from '../../components/widgets/ReviewStars/ReviewStars';
import { ReviewStarsMUI } from '../../components/widgets/ReviewStars/ReviewStars';
import Button from '../../components/widgets/Button/Button';
import ReviewCard from '../../components/Review/ReviewCard';
import Loading from '../../components/widgets/Loading/Loading';
import { useAlert } from 'react-alert';
import MetaData from '../../MetaData';
import ReviewDialog from '../../components/Review/ReviewDialog';
import { NEW_REVIEW_RESET } from '../../redux/constants/productConstants';


// Product Details Or, Single Product Page..
const Product = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const Alert = useAlert();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const [quantity, setQuantity] = useState(1);
    const [review, setReview] = useState({
        rating: 0,
        comment: '',
    });
    const [openDialog, setOpenDialog] = useState(false);
    const { success: reviewSuccess, error: reviewError } = useSelector((state) => state.newReview);

    // useEffect for Product..
    useEffect(() => {
        if (error) {
            Alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            Alert.error(reviewError);
            dispatch(clearErrors());
            setOpenDialog(false);
        }

        if (reviewSuccess) {
            Alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
            setOpenDialog(false);
        }

        dispatch(getProductDetails(productId));
    }, [dispatch, productId, reviewError, reviewSuccess]);


    // Submit the review or, Review Make Or Update..
    const handleSubmitReview = () => {
        const myForm = new FormData();

        if (productId && review.rating) {
            myForm.set("rating", review.rating);
            myForm.set("comment", review.comment);

            dispatch(newReview(productId, myForm));
        } else {
            Alert.info("Needs rating to Make Or Update Review");
        }
    };

    // Control Quantity..
    const controlQuantity = (type) => {
        if (type === "INCREMENT") {
            if (product.stock <= quantity) return;

            let incQuantity = quantity + 1;
            setQuantity(incQuantity);
        }

        if (type === "DECREMENT") {
            if (1 >= quantity) return;

            let decQuantity = quantity - 1;
            setQuantity(decQuantity);
        }
    };

    // Add to Cart Handler Function..
    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId, quantity));
        Alert.success("Item Added To Cart Successfully");
    };

    if (!loading) {
        return (
            <>
                {/* ---- Meta Data ---- */}
                <MetaData title={`${product.name} | Big Store`} />

                {/* ---- Product Details ---- */}
                <div className="product-details">
                    {/* ----- Left Side Product Preview ----- */}
                    <div>
                        <Carousel>
                            {product.images &&
                                product.images.map((image, i) => (
                                    <Carousel.Item className="product-slider-item">
                                        <img
                                            key={i}
                                            className="d-block w-100 slider-img"
                                            src={image.url}
                                            alt="Second slide"
                                        />
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    </div>


                    {/* ---- Right Side Product Details ----- */}
                    <div>
                        <div className="details-block-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>

                        <div className="details-block-2">
                            {/* <ReviewStars ratings={product.ratings} numOfReviews={product.numOfReviews} /> */}
                            <ReviewStarsMUI ratings={product.ratings} numOfReviews={product.numOfReviews} size="medium" />
                        </div>

                        <div className="details-block-3">
                            <h1>{product.price} BDTK</h1>

                            <div className="details-block-3-1">
                                <div className="details-block-3-1-1">
                                    <button onClick={() => controlQuantity("DECREMENT")}>-</button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={() => controlQuantity("INCREMENT")}>+</button>
                                </div>{" "}

                                <Button
                                    title="Add to Cart"
                                    variant="primary"
                                    onClick={addToCartHandler}
                                />
                            </div>

                            <p>
                                Status: {" "}
                                <b className={product.stock < 1 ? 'text-danger' : 'text-success'}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>

                        <div className="details-block-4">
                            Description: <p>{product.description}</p>
                        </div>

                        <Button onClick={() => setOpenDialog(true)} title="Submit Review" variant="secondary" />
                    </div>
                </div>

                {/* ----- Reviews ------ */}
                <h3 className="review-heading">REVIEWS</h3>

                {/* ---- Make Or, Update Review ---- */}
                <ReviewDialog
                    review={review}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    setReview={setReview}
                    handleSubmitReview={handleSubmitReview}
                />

                {product.reviews && product.reviews[0] ? (
                    <div className="reviews container">
                        {product.reviews && product.reviews.map(review => <ReviewCard review={review} />)}
                    </div>
                ) : (
                    <div>
                        <p className="no-reviews">No Reivews Yet</p>
                    </div>
                )}
            </>
        );
    } else {
        return <Loading />;
    }


};

export default Product;