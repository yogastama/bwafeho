// path sudah default dari node js nya agar bisa akses path system
const path = require("path");

module.exports = {
  paths: {
    /* Path to source files directory */
    // path source saat ngoding taruh akan di taruh di src
    source: path.resolve(__dirname, "../src/"),

    /* Path to built files directory */
    // path saat build akan terbuat folder dist 
    output: path.resolve(__dirname, "../dist/"),
  },
  // digunakan ketika melakukan npm start
  // akan terbuka otomatis tab localhost:9999 di browser
  server: {
    host: "localhost",
    port: 9999,
  },
  limits: {
    /* Image files size in bytes. Below this value the image file will be served as DataURL (inline base64). */
    // limitasi gambar setelah di compile
    images: 8192,

    /* Font files size in bytes. Below this value the font file will be served as DataURL (inline base64). */
    // limitasi fonts setelah di compile
    fonts: 8192,
  },
};
