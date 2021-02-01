/* eslint-disable import/no-extraneous-dependencies */
// merge webpack utama dan production
const { merge } = require("webpack-merge");
// load minify css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// load terser buat minify js
const TerserPlugin = require("terser-webpack-plugin");
// load webpack uatama buat digabungkan
const webpackConfiguration = require("../webpack.config");

module.exports = merge(webpackConfiguration, {
  // mode producttion
  mode: "production",

  /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
  // devtool nya udah dimatiin lagi jadi biar ngga ada space dan tabs
  devtool: false,

  /* Optimization configuration */
  // optimasi js dan css
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },

  /* Performance treshold configuration values */
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  /* Additional plugins configuration */
  // tambahan plugins saat mau dijalankan
  plugins: [],
});
