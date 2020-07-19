import * as path from 'path';
import * as webpack from 'webpack';


const config: webpack.Configuration = {
  target: 'web',
  mode: 'production',
  entry: [
    path.join(process.cwd(), 'src/app/index.js'),
  ],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
            loader: "ts-loader",
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ],
  },
  plugins: [],
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
};

export default config;