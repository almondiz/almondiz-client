const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

const port = process.env.PORT || 8080;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]"
              },
              sourceMap: true,
            }
          },
          { loader: "scoped-css-loader" },
          {
            loader: "sass-loader",
            options: {
              additionalData: `
                @import "./src/variables.scss";
              `,
            }
          },
        ]
      },
      {
        test: /\.(svg|jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: false
    }),
    // only develoment
    new ReactRefreshPlugin()
  ],
  // only develoment
  devtool: "inline-source-map",
  devServer: {
    host: "localhost",
    open: true,
    port,
    historyApiFallback: true,
    hot: true,
  }
}