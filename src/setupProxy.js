const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy(
    '/api', {
      target: 'http://perf.sftcwl.com', // 线上
      // target: 'http://10.188.40.2:9999',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  ));
};
