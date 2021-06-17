const path = require('path');
const Dotenv= require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  plugins: [
    new Dotenv()
  ],
  output: {
    filename: 'bundle.js',
    path:path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
       test: /\.(png|jpe?g|gif)$/i,
       use: [
         {
           loader: 'file-loader',
         }
       ]
     },
     {
       test: /\.(woff|woff2|eot|ttf|otf)$/i,
       type: 'asset/resource',
     }
    ]
  }
};
