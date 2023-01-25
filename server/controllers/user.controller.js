const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const sendToken = require('../utils/jwtToken');
// const sendEmail = require('../utils/sendEmail');
// const crypto = require('crypto');
// const cloudinary = require('cloudinary');

/**
 * ===== Get User Details =====
 */
exports.getUserDetails = catchAsyncErrors(async (req, res, _next) => {
    const { _id: userId } = req.user;
    const user = await User.findById(userId);

    res.status(200).json({
        success: true,
        user
    });
});

/**
 * ===== Update / Change User Password =====
 */
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
    const { _id: userId } = req.user;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Find user with password..
    const user = await User.findById(userId).select("+password");
    const isPasswordMatched = await user.comparePassword(oldPassword);

    // Error on Password Matching and Comparing..
    if (!isPasswordMatched) return next(new ErrorHandler("Incorrect Password", 400));
    if (newPassword !== confirmPassword) return next(new ErrorHandler("Password not matched!", 400));

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);
});

/**
 * ===== Update User Info. / Details / Profile =====
 */
exports.updateUserDetails = catchAsyncErrors(async (req, res, _next) => {
    const { _id: userId } = req.user;
    const { name, email } = req.body;
    let newData = {
        name,
        email,
    };

    if (req.file) {
        const { originalname, filename } = req.file;

        // Image URL with Our Node Server..
        const avatarURL = `http://${process.env.HOST}:${process.env.PORT}/images/avatars/${filename}`;

        // If you Have Cloudinary..
        // First Destroy Older one then update..
        // await cloudinary.v2.uploader.destroy(avatar.public_id);

        // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        //     folder: "bigStore/avatar",
        //     width: 150,
        //     crop: "scale",
        // });

        // newData.avatar = {
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url,
        // };

        newData.avatar = {
            public_id: originalname,
            url: avatarURL,
        };
    }

    // Update User Profile Details..
    const user = await User.findByIdAndUpdate(userId, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    });
});

/**
 * ===== Get All Users ---- (Admin) =====
 */
exports.getAllUsers = catchAsyncErrors(async (_req, res, _next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
});

/**
 * ====== Get User Info. / Details ---- (Admin) ======
 */
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler(`User Not Exists With Id: ${id}`, 404));

    res.status(200).json({
        success: true,
        user
    });
});


/**
 * ===== Update User Role ---- (Admin) =====
 */
exports.updateUserRole = catchAsyncErrors(async (req, res, _next) => {
    const { id: userId } = req.params;
    const { role } = req.body;

    // Update User Role..
    const user = await User.findByIdAndUpdate(userId, { role }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    });
});

/**
 * ===== Remove / Delete User ---- (Admin) =====
 */
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const { id: userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return next(new ErrorHandler(`User does not exist with id: ${userId}`, 404));

    // Remove / Delete User..
    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Removed Successfully!"
    });
});