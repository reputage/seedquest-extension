const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  
  entry: './app/ui/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app')
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(jpg|png)$/, loader: 'url?limit=25000' },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
      { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] }
    ]
  }
};