const path = require('path');
const fs = require('fs');
const CompressionPlugin = require('compression-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/dist');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/ant-theme-vars.less'), 'utf8'));

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['react'],
          plugins: [
            ['import', { libraryName: 'antd', style: true }],
            'transform-strict-mode'
          ]
        },
      }, {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
              root: path.resolve(__dirname, './')
            }
          }
        ]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js/,
      threshold: 10240,
      minRatio: 0.8
    }),
    // new webpack.DefinePlugin({ // <-- key to reducing React's size
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.DedupePlugin(), //dedupe similar code 
    // new webpack.optimize.UglifyJsPlugin(), //minify everything
    // new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
  ],
};
