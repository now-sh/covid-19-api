function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl} 🔍`);
  next(error);
}

function ServerError(req, res, next) {
  res.status(500);
  const error = new Error(`‼️ - Server Malfunction - ${req.originalUrl} ‼️`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

const onProxyError = function (err, req, res) {
  errorHandler(err);
};

const onProxyReq = function (proxyReq, req, res) {
  proxyReq.setHeader('accept', 'application/json');
};

const onProxyRes = function (proxyRes, req, res) {
  proxyRes.headers['accept'] = 'application/json';
  proxyRes.headers['x-powered-by'] = 'CasjaysDev API';
  delete proxyRes.headers[
    ('ng-key', 'x-powered-by', 'x-download-options', 'server')
  ];
};

module.exports = {
  notFound,
  ServerError,
  errorHandler,
  onProxyError,
  onProxyReq,
  onProxyRes,
};
