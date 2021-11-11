// const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(
  '/v3',
  createProxyMiddleware({
    target: 'https://disease.sh/v3',
    changeOrigin: true,
    pathRewrite: {
      [`^/v3`]: 'https://disease.sh/v3',
    },
  })
);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
const host = process.env.HOSTNAME || 'localhost';

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening on: http://${host}:${port}`);
  /* eslint-enable no-console */
});
