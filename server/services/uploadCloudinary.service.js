const cloudinary = require('cloudinary');

exports.cloudinaryUpload = async (avatar) => {
    // Upload To Cloudinary..
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "bigStore/avatar",
        width: 150,
        crop: "scale",
    });
    return myCloud;
};