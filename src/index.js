const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();

const middlewares = require('./middlewares');
const { error } = require('console');
const port = process.env.PORT || 5000;
const host = process.env.HOSTNAME || 'localhost';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  '/v3',
  createProxyMiddleware({
    pathRewrite: {
      [`^/v3`]: 'https://disease.sh/v3',
    },
    target: 'https://disease.sh',
    changeOrigin: true,
    onError: middlewares.onProxyError,
    onProxyReq: middlewares.onProxyReq,
    onProxyRes: middlewares.onProxyRes,
  })
);

app.use(
  '/api',
  createProxyMiddleware({
    pathRewrite: {
      [`^/api`]: 'https://disease.sh/v3',
    },
    target: 'https://disease.sh',
    changeOrigin: true,
    onProxyReq: middlewares.onProxyReq,
    onProxyRes: middlewares.onProxyRes,
    onError: middlewares.onProxyError,
  })
);

app.get('/docs', (req, res) => {
  res.status(301).redirect('https://disease.sh/docs/');
});

app.get('/help', (req, res) => {
  res.status(301).redirect('https://disease.sh/docs/');
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening on: http://${host}:${port}`);
  /* eslint-enable no-console */
});
