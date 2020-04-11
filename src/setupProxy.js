const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/hr-rest', '/rest'],
    createProxyMiddleware({
      target: 'http://localhost:8888',
      changeOrigin: true,
	  logLevel: 'debug',
    })
  );
};
