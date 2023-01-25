const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * ====== Payment Process ======
 */
exports.processPayment = catchAsyncErrors(async (req, res, _next) => {
    const { amount } = req.body;

    const myPayment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "bdt",
        metadata: {
            company: "Ecommerce"
        },
    });

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
    });
});

/**
 * ======= Send API Key to Client ======
 */
exports.sendStripeApiKey = catchAsyncErrors(async (_req, res, _next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});