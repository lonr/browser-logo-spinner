const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      { test: /\.ts$/, use: "ts-loader" },
      {
        test: /\.svg$/,
        type: "asset/source",
        include: path.resolve(__dirname, "./assets/infinite-loop/"),
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".svg"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
