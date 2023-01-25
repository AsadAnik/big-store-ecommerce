const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });
const express = require('express');
const ErrorHandler = require('./error');
const app = express();
// const cloudinary = require('cloudinary');


// Cloudinary Configurations..
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });


app.use(require('./middleware'));
app.use(require('./routes'));
app.use(ErrorHandler.globalErrorHandle);
app.use("/images", express.static(path.join(__dirname, "../images")));

// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files..
    app.use(express.static(path.join(__dirname, '../../client/build')));

    // Handle react routing, return all requests to React App..
    app.get('*', function (_req, res) {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html')); 
    });
}

module.exports = app;