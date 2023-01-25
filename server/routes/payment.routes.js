const router = require('express').Router();
const { processPayment, sendStripeApiKey } = require('../controllers/payment.controller');

/**
 * ----- Process Payment Route -----
 */
router.route('/process').post(processPayment);

/**
 * ----- Send Stripe API Key to Client -----
 */
router.route('/stripeApiKey').get(sendStripeApiKey);

module.exports = router;