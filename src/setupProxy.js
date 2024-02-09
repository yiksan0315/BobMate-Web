const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/v1', {
      // target: 'http://43.202.23.75/',
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};