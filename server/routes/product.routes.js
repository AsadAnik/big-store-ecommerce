const router = require('express').Router();
const {
    showAllProducts,
    showSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReviewOrUpdate,
    getAllProductReviews,
    deleteReview,
} = require('../controllers/product.controller');
const { isAuthenticatedUser: auth, authorizeRoles: authRole } = require('../middleware/auth');

/**
 * ---- Create Product endpoint..
 */
router.post('/create', auth, authRole("admin"), createProduct);

/**
 * ----- Product Review Or Update -----
 */
router.put('/review/:productId', auth, createProductReviewOrUpdate);

/**
 * ----- Get All Reviews & Delete Review -----
 */
router.route('/reviews')
    .get(getAllProductReviews)
    .delete(auth, deleteReview);


/**
* ---- Single Read, Update & Delete Product ----
*/
router.route('/:id')
    .get(showSingleProduct)
    .put(auth, authRole("admin"), updateProduct)
    .delete(auth, authRole("admin"), deleteProduct);

/**
 * ---- Read Product endpoint..
 */
router.get('/', showAllProducts);

module.exports = router;