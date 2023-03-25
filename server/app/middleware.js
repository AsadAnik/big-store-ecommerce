const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const fileUpload = require('express-fileupload');

// Cors Config ---
const corsConfig = {
    credentials: true,
    origin: true,
};

const middleware = [
    morgan('dev'),
    cors(corsConfig),
    express.json({limit: '50mb'}),
    cookieParser(),
    // fileUpload(),
];

module.exports = middleware;