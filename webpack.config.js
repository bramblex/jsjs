
const webpack = require('webpack')

module.exports = {
  target: 'node',
  entry: { 
    'interpreter': './src/main.ts',
    'test': './src/test.ts',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/lib/',
    library: '[name]',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  }
}