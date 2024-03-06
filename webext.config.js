const path = require('path');
const { merge } = require('webpack-merge');
const { get } = require('lodash');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: (config, { src, target, dev, vendor }) => {
    var target = path.resolve(target.replace('[vendor]', vendor));
    config.module = merge(config.module ?? {}, {
      noParse: /\/assets\/js\//,
      rules: get(config, 'module.rules', []).concat([
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          type: 'asset',
        },
      ]),
    });
    config.plugins = get(config, 'plugins', []).concat([
      new CopyPlugin({
        patterns: [
          {
            context: path.resolve(src),
            from: path.resolve(src, './assets/js/**'),
            to: target,
          },
          {
            context: path.resolve(src),
            from: path.resolve(src, 'redirect-rules.json'),
            to: target,
          },
        ],
      }),
    ]);
    config.optimization = merge(get(config, 'optimization', {}), {
      minimize: !dev,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: /^\**!|@preserve|@license|@cc_on/i,
            },
            compress: true,
            mangle: true,
          },
          extractComments: true,
        }),
      ],
    });
    config.resolve = merge(get(config, 'config.resolve', {}), {
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    });
    return config;
  },
};
