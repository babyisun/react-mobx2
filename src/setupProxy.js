const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy(
    '/api', {
      target: 'http://xxx.sftcwl.com', // 线上
      // target: 'http://1.1.1.1:9999',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  ));
};
