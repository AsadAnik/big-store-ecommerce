const router = require('express').Router();
const orderRoutes = require('../routes/order.routes');
const productRoutes = require('../routes/product.routes');
const userRoutes = require('../routes/user.routes');
const authRoutes = require('../routes/auth.routes');
const paymentRoutes = require('../routes/payment.routes');
const { isAuthenticatedUser } = require('../middleware/auth');

// Use Ticket Routes..
// router.use('/api/v1/tickets', require('../routes/ticketRoutes'));
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/product', productRoutes);
router.use('/api/v1/user', isAuthenticatedUser, userRoutes);
router.use('/api/v1/order', isAuthenticatedUser, orderRoutes);
router.use('/api/v1/payment', isAuthenticatedUser, paymentRoutes);

router.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Success' });
});

module.exports = router;
