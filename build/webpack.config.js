const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const paths = require('./paths');
const helpers = require('./helpers');

const {NODE_ENV} = process.env;

const isProduction = NODE_ENV === 'production';

module.exports = {
 entry: paths.entry,
 mode: NODE_ENV,
 output: {
  path: paths.dist,
  filename: isProduction ? 'bundle.[hash].min.js' : 'bundle.js',
 },
 module: {
  rules: [
   {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
     loader: 'babel-loader',
    },
   },
   {
    test: /\.scss$/,
    use: [
     {loader: MiniCssExtractPlugin.loader},
     {loader: 'css-loader', options: {}},
     {
      loader: 'postcss-loader',
      options: {
       plugins: [
        autoprefixer({
         browsers:['ie >= 8', 'last 4 version']
        })
       ],
       sourceMap: true
      }
     },
     {loader: 'sass-loader', options: {}},
     {
      loader: 'sass-resources-loader',
      options: {
       resources: helpers.provideSassResources(),
      },
     },
    ],
   },
   {
    test: /\.(png|jpe?g|gif|svg|webp|mp4)$/,
    use: {
     loader: 'file-loader',
     options: {
      regExp: /(?<=img)((?:[a-z0-9\-\_\.\/]+\/)|(?:\/))([a-z0-9\-\_\.]+)\.(png|jpg|gif|webp)$/i,
      name: '[name].[ext]',
      outputPath: 'image',
     },
    },
   },
   {
    test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    use: {
     loader: 'file-loader',
     options: {
      name: '[name].[ext]',
      outputPath: 'fonts',
     },
    },
   },
  ],
 },
 optimization: {
  minimizer: [
   new TerserPlugin({
    cache: true,
    parallel: true,
   }),
   new OptimizeCssAssetsPlugin({}),
  ],
 },
 devServer: {
  host: '0.0.0.0',
  port: 3000,
 },
 resolve: {
  alias: {
   '@': paths.src,
   '@img': path.resolve(paths.src, 'assets/image'),
   '@design': path.resolve(paths.src, 'assets/scss/main.scss'),
  },
 },
 plugins: [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
   filename: isProduction ? '[name].[hash].min.css' : '[name].css',
   chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
  }),
  new SVGSpritemapPlugin('src/assets/icons/*.svg', {
   output: {
    filename: 'icons/sprite.svg',
   },
  }),
  new HtmlWebpackPlugin({
   filename: 'index.html',
   template: path.resolve(paths.src, 'index.html'),
  })
 ],
};
