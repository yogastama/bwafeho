// require path dan filesystem os kita
const path = require("path");
const fs = require("fs");

// require dependencies

// require dev webpack
const CopyWebpackPlugin = require("copy-webpack-plugin");
// require dev html webpack
const HTMLWebpackPlugin = require("html-webpack-plugin");
// require minimal image buat limitasi saat build sesuai di env.js
const ImageMinPlugin = require("imagemin-webpack-plugin").default;
// require dev minifycss buat meminimalkan css saat build
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// clean webpack
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// require file environmetnya
const environment = require("./configs/env");
// saaat ngoding, file kita mau taruh di templates
const templateFiles = fs.readdirSync(
  path.resolve(__dirname, environment.paths.source, "templates")
);
// gunakan html plugin entries
const htmlPluginEntries = templateFiles.map(
  (template) =>
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: template,
      // path template nya
      template: path.resolve(environment.paths.source, "templates", template),
      // path untuk favicon
      favicon: path.resolve(environment.paths.source, "images", "favicon.ico"),
    })
);

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, "js", "app.js"),
  },
  output: {
    path: environment.paths.output,
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: environment.paths.source,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "images/design/[name].[hash:6].[ext]",
              publicPath: "../",
              limit: environment.limits.images,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "fonts/[name].[hash:6].[ext]",
              publicPath: "../",
              limit: environment.limits.fonts,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].minify.css",
    }),
    new ImageMinPlugin({ test: /\.(jpg|jpeg|png|gif|svg)$/i }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, "images", "content"),
          to: path.resolve(environment.paths.output, "images", "content"),
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
        {
          from: path.resolve(environment.paths.source, "css"),
          to: path.resolve(environment.paths.output, "css"),
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
      ],
    }),
  ].concat(htmlPluginEntries),
  target: "web",
};
