const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const extractText = new ExtractTextPlugin({
  filename: "[name].[contentHash].css",
  disable: !isProd,
});
const plugins = [extractText];
let fileName = "[name].js";
let mode = "development";
let devTool = "eval";
let htmlConfig = {
  inject: true,
  template: path.join(__dirname, "src", "index.html"),
};

// Development only config

// Production only config
if (isProd) {
  fileName = "[name].[chunkhash].min.js";
  mode = "production";
  devTool = "none";
  plugins.push(new UglifyJsPlugin(), new CleanWebpackPlugin(["dist"]));
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

plugins.push(new HtmlWebpackPlugin(htmlConfig));

module.exports = {
  entry: path.resolve(__dirname, "src", "scripts", "app.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: fileName,
  },
  mode,
  devtool: devTool,
  stats: {
    colors: true,
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    port: 3000,
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", "sass"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
  },
  profile: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.sass$/,
        use: extractText.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader",
            "sass-loader",
          ],
        }),
      },
    ],
  },
  plugins,
};
