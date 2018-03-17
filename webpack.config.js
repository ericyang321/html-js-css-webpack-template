const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractText = new ExtractTextPlugin({
  filename: '[name].[contentHash].css',
  disable: false,
});

const isProd = process.env.NODE_ENV === 'production';
let fileName;
let mode = 'development';
let devTool = 'eval';
let htmlConfig = {
  inject: true,
  template: path.join(__dirname, 'src', 'index.html'),
};

if (isProd) {
  fileName = 'bundle.min.js';
  mode = 'production';
  devTool = 'none';
  htmlConfig = Object.assign({}, htmlConfig, {
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  });
}

module.exports = {
  entry: path.resolve(__dirname, 'src', 'scripts', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: fileName,
  },
  mode,
  devtool: devTool,
  stats: {
    colors: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.sass$/,
        use: extractText.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(htmlConfig),
    new CleanWebpackPlugin(['dist']),
    extractText,
  ],
};
