const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')

const dflPort = 8080  // 配置端口

module.exports = {
  // 配置服务器
  devServer: {
    port: dflPort,
    contentBase: path.join(__dirname, './app'),
    historyApiFallback: true,
    inline: true,
    noInfo: false,
    open: true,
    stats: {colors: true},
    overlay: {
      warnings: true,
      errors: true
    }
  },
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + dflPort,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/app/src/index.js')
  ],
  output: {
    path: '/dist/assets',
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: 'react-hot-loader!babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.scss/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loaders: [
          'url-loader?limit=10000&name=[hash:8].[name].[ext]'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.*$|$)/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.jsx','.json'],
    alias: {
      'api': path.join(__dirname, '/app/src/api'),
      'components': path.join(__dirname, '/app/src/components'),
      'images': path.join(__dirname, '/app/src/images'),
      'utils': path.join(__dirname, '/app/src/utils')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [autoprefixer]
        }
      }
    }),
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    // new webpack.optimize.DedupePlugin(), //dedupe similar code
    // new webpack.optimize.UglifyJsPlugin(), //minify everything
    // new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
  ]
}
