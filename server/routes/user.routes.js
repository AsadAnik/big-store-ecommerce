const router = require('express').Router();
const { authorizeRoles } = require('../middleware/auth');
const {
    getUserDetails,
    updateUserPassword,
    updateUserDetails,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
} = require('../controllers/user.controller');
const uploadImage = require('../middleware/uploadImage');


/**
 * ----- User Details (Profile) & Update Profile Details -----
 */
router.route('/profile')
    .get(getUserDetails)
    .put(uploadImage.single("avatar"), updateUserDetails);

/**
 * ----- Update / Change Password -----
 */
router.put('/update_password', updateUserPassword);

/**
 * ------ See All Users (Admin) ------
 */
router.get('/admin/users', authorizeRoles("admin"), getAllUsers);

/**
 * ------ User Details, Role Update & Delete / Remove  (Admin) -----
 */
router.route('/admin/user/:id')
    .get(authorizeRoles("admin"), getSingleUser)
    .put(authorizeRoles("admin"), updateUserRole)
    .delete(authorizeRoles("admin"), deleteUser);

module.exports = router;