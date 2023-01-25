const Product = require("../models/Product");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures')


/**
 * ------ Product Create Here (Admin) -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.createProduct = catchAsyncErrors(async function (req, res, next) {
    // adding userId also for product..
    req.body.user = req.user._id;
    const product = await Product.create(req.body);
    if (!product) return next(new ErrorHandler('Can\'t Create Product', 500));

    res.status(201).json({
        success: true,
        product,
    });
});


/**
 * ------ To Show All Products ------
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.showAllProducts = catchAsyncErrors(async function (req, res, next) {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    // Including the API Features..
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();
    
    // let filteredProducts = await apiFeatures.query;
    // let filteredProductsCount = filteredProducts.length;
    apiFeatures.pagination(resultPerPage);

    const products = await apiFeatures.query;
    if (!products) return next(new ErrorHandler('No Products Here', 404));

    res.status(200).json({
        success: true,
        products,
        productsCount,
        // filteredProductsCount,
        resultPerPage,
    });
});


/**
 * ----- Show Products Details or Single Products View ----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.showSingleProduct = catchAsyncErrors(async function (req, res, next) {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) return next(new ErrorHandler('Product not found', 404));

    res.status(200).json({
        success: true,
        product
    });
});


/**
 * ------- Update Product (Admin) -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.updateProduct = catchAsyncErrors(async function (req, res, next) {
    const productId = req.params.id;
    let product = await Product.findById(productId);

    if (!product) return next(new ErrorHandler('Product not found', 404));

    product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
});


/**
 * ----- Product Delete (Admin) -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.deleteProduct = catchAsyncErrors(async function (req, res, next) {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) return next(new ErrorHandler('Product not found', 404));
    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product Deleted Successfully'
    });
});


/**
 * ----- Create Review Or, Update Review -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.createProductReviewOrUpdate = catchAsyncErrors(async function (req, res, next) {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    // Finding the product..
    const product = await Product.findById(productId);
    // Looking for reviewed by same user...
    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    // Should Update review or, Create review..
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.rating = rating;
                review.comment = comment;
            }
        });

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // Getting the Ratings Avarage..
    let totalRatings = 0;
    product.reviews.forEach(review => {
        totalRatings += review.rating;
    });
    let avgOfRatings = totalRatings / product.reviews.length;
    // add to product ratings..
    product.ratings = avgOfRatings;

    await product.save({ validateBeforeSave: false });
    
    res.status(200).json({
        success: true,
    });
});

/**
 * ----- Get Product's all Reviews -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getAllProductReviews = catchAsyncErrors(async function (req, res, next) {
    const { productId } = req.query;
    const product = await Product.findById(productId);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

/**
 * ----- Delete Product's Review -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.deleteReview = catchAsyncErrors(async function (req, res, next) {
    const { productId, reviewId } = req.query;
    const product = await Product.findById(productId);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    const reviews = product.reviews.filter(review => {
        // console.log(review._id.toString() !== reviewId)
        return review._id.toString() !== reviewId;
    });

    let totalAvg = 0;
    reviews.forEach(review => {
        totalAvg += review.rating;
    });
    const ratings = totalAvg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(productId, {
        reviews,
        ratings,
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});