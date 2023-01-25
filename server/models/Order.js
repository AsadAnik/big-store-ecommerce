const { Schema, model } = require('mongoose');

// The Order Schema..
const orderSchema = new Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pinCode: { type: Number, required: true },
        phoneNo: { type: Number, required: true },
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            product: { type: Schema.ObjectId, ref: "Product", required: true },
        }
    ],
    user: { type: Schema.ObjectId, ref: "User", required: true },
    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true }
    },
    paidAt: { type: Date, required: true },
    itemsPrice: { type: Number, default: 0, required: true },
    taxPrice: { type: Number, default: 0, required: true },
    shippingPrice: { type: Number, default: 0, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    orderStatus: { type: String, required: true, default: "Processing" },
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now },
});

// Order Model..
const Order = model("Order", orderSchema);
module.exports = Order;