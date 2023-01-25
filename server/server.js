const http = require('http'),
    app = require('./app/app'),
    connectDB = require('./db/db');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/e-commerce';

// Handling Uncaught Exception..
process.on("uncaughtException", (error) => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1);
});

// Node Server..
const server = http.createServer(app);

// DB Connection and server Listeninig..
connectDB(DB_URI)
    .then(() => {
        console.log('--------- Database is connected! -------');
        // Listening to Server..
        server.listen(PORT, HOST, () => {
            console.log(`Welcome to -- ${process.env.APP_NAME} -- `);
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    });

// Handling Unhandled Promise Rejection..
process.on("unhandledRejection", (error) => {
    console.log(`Error: ${error.message}`);
    console.log('Shutting down the server due to the Unhandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    });
});