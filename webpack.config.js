const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const { InjectManifest } = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const PUBLIC_PATH = 'http://app.ginocode.ir/';


const webpackPlugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "public/index.html"),
    filename: "index.html",
  }),
  new Dotenv({
    path: "./.env",
    systemvars: true,
  }),
  new CopyPlugin({
    patterns: [
      { from: "./public/favicon.ico", to: "" },
      { from: "./public/manifest.json", to: "" },


    ],
  }),
];

if ("production" === process.env.NODE_ENV) {
  webpackPlugins.push(
    new InjectManifest({
      swSrc: "./src/src-sw.js",
      swDest: "sw.js",
    })
  );
}

module.exports = {
  context: __dirname,
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: PUBLIC_PATH,
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        use: "babel-loader",
      },

      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|gif)?$/,
        use: "file-loader?name=./images/[name].[ext]",
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // 3. Inject styles into DOM
            "css-loader", // 2. Turns css into commonjs
            "sass-loader", // 1. Turns sass into css
        ],
    },
    ],
  },
  plugins: webpackPlugins,
};
