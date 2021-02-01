// kalo ngejalanin development mode atau yang menjalankan file ini di packagejson, maka skrip ini akan dijalankan dengan kode berikut 

// load webpack merge
// berfungsi untuk menggabungkan webpack.config.js dengan file ini
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");

// ambil webpack confignya
const webpackConfiguration = require("../webpack.config");
// load file env nya
const environment = require("./env");
// gabungin webpack utama dengan settingan webpack ini
module.exports = merge(webpackConfiguration, {
  // mode jadi development
  mode: "development",

  /* Manage source maps generation process */
  // eval source map ini berfungsi untuk memudahkan untuk melihat kodingan mode development walaupun sudah dibuild
  devtool: "eval-source-map",

  /* Development Server Configuration */
  // nyalakan devserver agar terbuka development server nya
  devServer: {
    contentBase: environment.paths.output,
    watchContentBase: true,
    // path yang akan di load
    publicPath: "/",
    // open langsung in browser : true
    open: true,
    historyApiFallback: true,
    compress: true,
    overlay: true,
    hot: false,
    watchOptions: {
      poll: 300,
    },
    // load setup server di env
    ...environment.server,
  },

  /* File watcher options */
  // kode dibawah fungsinya buat mengabaikan folder node_modules walaupun ada perubahan, jadi ngga lama saat perubahan
  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },

  /* Additional plugins configuration */
  // untuk tambahan plugins
  plugins: [],
});
