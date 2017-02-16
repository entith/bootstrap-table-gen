var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var clientBundleOutputDir = './dist';

module.exports = {
  entry: './src/js/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      { test: /\.pug$/, use: 'pug-html-loader' },
      // { test: /\.css(\?|$)/, use: extractCSS.extract(['css-loader']) },
      { test: /\.css(\?|$)/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
      {
              test: /\.(sass|scss)$/,
              use: [
                'style-loader',
                'css-loader?importLoaders=1',
                {
                  loader: 'postcss-loader',
                  options: { plugins: function(){ return [
                    autoprefixer({ browsers: "> 1%, last 2 version, ie >= 8" })
                  ] } }
                },
                'sass-loader'
              ]
            }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.pug'
    }),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map', // Remove this line if you prefer inline source maps
      moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
    })
  ]
};
