const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware");

module.exports = (req, res) => {
    let target = "https://www.google.com/";
    //   if (
    //     req.url.startsWith("/api") ||
    //     req.url.startsWith("/auth") ||
    //     req.url.startsWith("/banner") ||
    //     req.url.startsWith("/CollegeTask")
    //   ) {
    //     target = "http://106.15.2.32:6969";
    //   }

    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            // rewrite request path `/backend`
            //  /backend/user/login => http://google.com/user/login
            //   "^/backend/": "/",
        },
        selfHandleResponse: true,
        on: {
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                res.statusCode = 418; // set different response status code

                const response = responseBuffer.toString('utf8');
                return response.replaceAll('Google ', 'Test ');
            }),
        },
    })(req, res);
};
