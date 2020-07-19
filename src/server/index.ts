import { resolve } from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { logger } from './services';

import { createWebpackDevMiddlewares, reactInstanceReqHandler } from './middlewares';

const isDev = process.env.NODE_ENV === 'development';

const app = express();

logger.info('Starting application...');
logger.info(`Environment: ${process.env.NODE_ENV}`);
logger.info(`ProcessID: ${process.pid}`);

if (isDev) {
  const { devMiddleware, hotMiddleware } = createWebpackDevMiddlewares();
  app.use(devMiddleware);
  app.use(hotMiddleware);
} else {
  const outputPath = resolve(process.cwd(), 'build');
  app.use(compression());
  app.use('/', express.static(outputPath));
}

app.set('view engine', 'ejs');
app.set('views', resolve('public'));

app.use(cookieParser());

app.use('/', reactInstanceReqHandler);

app.get('*.js', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});

app.listen(
  {
    port: process.env.PORT || 3000,
  },
  () => {
    logger.info('Server created successfully..');
    logger.info(`Hosted at http://localhost:${process.env.PORT || 3000}`);
  },
);
