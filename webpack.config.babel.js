import path from 'path';  
//import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => ({  
  entry: [
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //       filename: 'index.html',
  //       template: './public/index.html'
  //   }),

  // ],
  module: {
    rules: [
      {
        test: /.js?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true
                
              
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },

      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=public/fonts/[name].[ext]' },

      {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'url-loader?limit=10000',
        'img-loader'
      ]
    }


    ]
  },
});
