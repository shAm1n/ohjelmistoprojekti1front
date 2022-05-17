const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ohjelmistoprojekti1kysely.herokuapp.com',
      changeOrigin: true,
    })
  );
};