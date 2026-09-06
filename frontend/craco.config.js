// craco.config.js
const path = require("path");
const webpack = require("webpack");
require("dotenv").config();

const webpackConfig = {
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: {
      add: [
        new webpack.DefinePlugin({
          'process.env.PADDLE_CLIENT_TOKEN': JSON.stringify(
            process.env.PADDLE_CLIENT_TOKEN || process.env.REACT_APP_PADDLE_CLIENT_TOKEN || ''
          ),
          'process.env.PADDLE_PRICE_ID': JSON.stringify(
            process.env.PADDLE_PRICE_ID || process.env.REACT_APP_PADDLE_PRICE_ID || ''
          ),
          'process.env.PADDLE_ENV': JSON.stringify(
            process.env.PADDLE_ENV || process.env.REACT_APP_PADDLE_ENV || 'production'
          ),
        }),
      ],
    },
    configure: (webpackConfig) => {
      // Add ignored patterns to reduce watched directories
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/build/**',
          '**/dist/**',
          '**/coverage/**',
          '**/public/**',
        ],
      };
      return webpackConfig;
    },
  },
};

module.exports = webpackConfig;
