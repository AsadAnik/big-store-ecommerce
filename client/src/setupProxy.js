const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(createProxyMiddleware("/api/v1/*", {
        target: 'http://localhost:8080' || `${process.env.HOST}:${process.env.PORT}`,
        secure: false,
        changeOrigin: true
    }));

    // app.use(createProxyMiddleware("ws://localhost:8900/*", {
    //     target: "ws://localhost:8900",
    //     secure: false,
    //     changeOrigin: true
    // }));
};
