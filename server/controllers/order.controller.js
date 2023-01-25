const Order = require('../models/Order');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { updateStockService } = require('../services/order.services');

/**
 * ----- Make New Order -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.createNewOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const userId = req.user._id;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: userId,
    });
    if (!order) return next(new ErrorHandler('Can\'t Create Order', 500));

    res.status(200).json({
        success: true,
        order
    });
});

/**
 * ----- Get Single Order -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("user", "name email");
    if (!order) return next(new ErrorHandler('Can\'t Get Single Order With This Id'));

    res.status(200).json({
        success: true,
        order,
    });
});

/**
 * ----- My Orders / Orders By UserId -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.myOrders = catchAsyncErrors(async (req, res, _next) => {
    const { _id: userId } = req.user;
    const orders = await Order.find({ user: userId });

    res.status(200).json({
        success: true,
        orders,
    });
});

/**
 * ----- Get All Orders -- Admin -----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getAllOrders = catchAsyncErrors(async (_req, res, _next) => {
    const orders = await Order.find();

    // Get Total Price Amounts of Orders..
    let totalAmounts = 0;
    orders.forEach(order => {
        totalAmounts += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmounts,
        orders,
    });
});

/**
 * ----- Update Order Status -- Admin ----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return next(new ErrorHandler("Order not found with this Id", 404));
    if (order.orderStatus === "Delivered") return next(new ErrorHandler("You have already delivered this order", 400));

    order.orderItems.forEach(async (order) => {
        await updateStockService(order.product, order.quantity);
    });

    order.orderStatus = status;

    if (status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

/**
 * ----- Update Order Status -- Admin ----
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return next(new ErrorHandler("Order not found with this Id", 404));

    await order.remove();
    res.status(200).json({
        success: true,
    });
});