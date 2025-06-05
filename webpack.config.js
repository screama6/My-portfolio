const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Точка входа
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true, // очищает папку dist при сборке
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true, // горячая замена модулей
    open: true, // открыть браузер после запуска
    historyApiFallback: true, // для SPA маршрутизации
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // js и jsx файлы
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // css файлы
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // изображения
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // можно импортировать без расширения
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: false, // если иконка есть - укажи путь сюда
    }),
  ],
};
