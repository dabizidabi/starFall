const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    app: [
      './app.js'
    ]
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      // {
      //   test: /\.(png|jpe?g)$/,
      //   loaders: [{
      //     loader: "file-loader",
      //     options: {
      //       name: '[path][name].[ext]'
      //     }
      //   }]
      // }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, '')
  }

}