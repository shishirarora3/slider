  var path = require('path');
  var webpack = require('webpack');

  var commonsPlugin =
      new webpack.optimize.CommonsChunkPlugin('common.js');

  module.exports = {
  context: path.join(__dirname, '.'),
  entry: {
    app: "./app/App.js"
  },
  output: {
    path: 'build',// This is where images AND js will go
    //path: path.join(__dirname, '.'),
    //filename: "bundle.js",
    publicPath: "/assets/", //path that will be considered when requiring your files
    filename: '[name].js'
  },
    plugins: [commonsPlugin],//<script src="build/common.js"></script>
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
       test:  /\.html/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test:  /\.css?$/,
        loaders: ["style", "css"]
      },
      { test: /\.less$/,
        loaders: ["style", "css", "less"]},
      {
        test  : /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
}