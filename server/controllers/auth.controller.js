const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
// const { cloudinaryUpload } = require('../services/uploadCloudinary.service');
// const sharp = require('sharp');
// const path = require('path');

/**
 * ==== Register User ====
 */
exports.registerUser = catchAsyncErrors(async (req, res, _next) => {
    const { name, email, password } = req.body;
    let data = { name, email, password };

    if (req.file) {
        const { originalname, filename } = req.file;

        // Image URL with Our Node Server..
        const avatarURL = `http://${process.env.HOST}:${process.env.PORT}/images/avatars/${filename}`;

        // Upload To Cloudinary..
        // const myCloud = await cloudinaryUpload(avatar);

        // console.log(req.file);

        // const compressedImageSavePath = path.join(__dirname, '../', 'images', 'avatar', new Date().getTime() + "jpeg");

        // sharp(req.file.path).resize(500, 500).jpeg({
        //     quality: 50,
        //     chromaSubsampling: '4:4:4',
        // }).toFile(compressedImageSavePath, (err, info) => {
        //     if (err) {
        //         return console.log("ERR! -- ", err);
        //     } else {
        //         return console.log("INFO -- ", info);
        //     }
        // });

        data.avatar = {
            // public_id: myCloud.public_id,
            // url: myCloud.secure_url,
            public_id: originalname,
            url: avatarURL,
        };
    }

    const user = await User.create(data);

    // Get token from Schema Method on User Model..
    sendToken(user, 201, res);
});


/**
 * ==== Login User ====
 */
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler("Please Enter Email & Password", 400));

    // Find user..
    // +password for enable to get Password which is hided before into Schema design..
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email", 401));

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) return next(new ErrorHandler("Invalid Password", 401));

    // Generate Token..
    sendToken(user, 200, res, req);
});

/**
 * ==== Logout User ====
 */
exports.logoutUser = catchAsyncErrors(async (_req, res, _next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});


/**
 * ==== Forgot Password ====
 */
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User not found", 404));

    // Get ResetPassword Token..
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // The URL be like -- http://localhost:8080/api/v1/password/reset/${resetToken}
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `${process.env.APP_NAME} Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

/**
 * ===== Reset Password ====
 */
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const token = req.params.token;
    const { password, confirmPassword } = req.body;

    const resetPasswordToken = crypto().createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    // When don't found any user..
    if (!user) return next(new ErrorHandler('Reset Password Token is Invalid or has benn expired', 400));
    // When password is not matching with confirmPassword..
    if (password !== confirmPassword) return next(new ErrorHandler('Password is not matched', 400));

    // Let's changing the password..
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});