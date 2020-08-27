const path = require("path");
const {merge} = require("webpack-merge");
const baseConfig = require("./webpack.base");
const webpackNodeExternals = require("webpack-node-externals");

const serverConfig = {
  // Build bundle for Node (not for browser)
  target: "node",

  // Root file of app
  entry: "./src/index.js",

  // Where to put the output
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },

  // Remove node_module libs from server bundle.js - not necessary
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, serverConfig);
