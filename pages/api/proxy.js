const {createProxyMiddleware, responseInterceptor} = require("http-proxy-middleware");

module.exports = (req, res) => {
    let target = "https://www.google.com/";//your website url
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
        selfHandleResponse: true,
        pathRewrite: {
            // rewrite request path `/backend`
            //  /backend/user/login => http://google.com/user/login
            //   "^/backend/": "/",
        },
        on: {
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                const response = responseBuffer.toString('utf8'); // convert buffer to string
                return response.replace('Google', 'Test'); // manipulate response and return the result
            }),
        },
    })(req, res);
};