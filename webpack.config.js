const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var config = {
  target: 'electron-renderer',
  context: path.join(__dirname, '/app'),
  entry: './app.js',
  output: {
    path: path.join(__dirname, '/app/build'),
    filename: 'bundle.js',    // "./app/build/bundle.js"
  },
  externals: {
    "node-hid": 'commonjs node-hid'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src= output filename defined above
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'app/index.html')
    }),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: './app',
    hot: true,
    port: 8082
  }
};

module.exports = config;
