const router = require('express').Router();
const { authorizeRoles: authRole } = require('../middleware/auth');
const { createNewOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/order.controller');

/**
 * ----- Get All Orders -- Admin -----
 */
router.get('/all', authRole("admin"), getAllOrders);

/**
 * ----- My Orders / Orders by userId -----
 */
router.get('/myOrders', myOrders);

/**
 * ------ Dynamic - Order By Id, Update & Delete Order ------
 */
router.route('/:orderId')
    .get(getSingleOrder)
    .put(authRole("admin"), updateOrder)
    .delete(authRole("admin"), deleteOrder);

/**
 * ------ Create New Order -------
 */
router.route('/')
    .post(createNewOrder);

module.exports = router;