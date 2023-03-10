const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  
    entry: './src/index.js',
    output: {
        filename: 'todo.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html")
      })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
              },
            {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
        ],
      },
};



