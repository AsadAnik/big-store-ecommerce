const router = require('express').Router();
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword,
} = require('../controllers/auth.controller');
const uploadImage = require('../middleware/uploadImage');

/**
 * ---- Register User ----
 */
router.post('/register', uploadImage.single("avatar"), registerUser);

/**
 * ----- Login User ----
 */
router.post('/login', loginUser);

/**
 * ----- Forgot Passsword -----
 */
router.post('/password/forgot', forgotPassword);

/**
 * ---- Reset Password ----
 */
router.put('/password/reset/:token', resetPassword);

/**
 * ----- Logout User ----
 */
router.get('/logout', logoutUser);


module.exports = router;