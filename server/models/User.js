const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// The User Schema Here..
const userSchema = new Schema({
    name: {
        type: String,
        require: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more then 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password must be at least 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    token: String,
}, {
    timestamps: true
});

// Hash Password Before save..
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token.. For Cutom Schema Method..
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Password Comparing..
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generating Password Reset Token..
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token..
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding the resetPasswordToken to userSchema..
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Giving the expire time..
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

// User Model here..
const User = model('User', userSchema);
module.exports = User;