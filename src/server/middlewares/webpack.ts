import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../../../webpack/webpack.dev.babel';

export default () => {
  const compiler = webpack(webpackDevConfig);
  const devMiddleware = webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    publicPath: webpackDevConfig.output.publicPath,
    stats: 'errors-only',
    serverSideRender: true,
  });
  const hotMiddleware = webpackHotMiddleware(compiler);

  return {
    devMiddleware,
    hotMiddleware,
  };
};
