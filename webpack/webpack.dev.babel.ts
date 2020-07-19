import * as path from 'path';
import * as webpack from 'webpack';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

const config: webpack.Configuration = {
  target: 'web',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'src/client/index.tsx'),
  ],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            getCustomTransformers: () => ({ before: [createStyledComponentsTransformer()] }),
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
};

export default config;
