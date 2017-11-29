const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const isProd = (process.env.NODE_ENV || '').trim() === 'prod'

const config = {
  entry: {
    'frame-player': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]' + (isProd ? '.min' : '') + '.js',
    library: 'FramePlayer',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(pkg.version)
    })
  ]
}

if (isProd) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    }
  }))
}

module.exports = config
