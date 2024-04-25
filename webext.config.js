const path = require('path')
const { merge } = require('webpack-merge')
const { get } = require('lodash')
const CopyPlugin = require('copy-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')

module.exports = {
  webpack: (config, { src, target, dev, vendor }) => {
    var target = path.resolve(target.replace('[vendor]', vendor))
    config.devtool = false
    config.module = merge(config.module ?? {}, {
      noParse: [/main\.js$/],
      rules: get(config, 'module.rules', []).concat([
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          type: 'asset'
        }
      ])
    })
    config.plugins = get(config, 'plugins', []).concat([
      new CopyPlugin({
        patterns: [
          {
            context: path.resolve(src),
            from: './assets/js/main.bundle',
            to: 'assets/js/main.js'
          }
        ]
      }),
      new RemovePlugin({
        after: {
          root: `${target}/assets/js`,
          include: ['main.bundle']
        }
      })
    ])
    config.resolve = merge(get(config, 'config.resolve', {}), {
      alias: {
        'react': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime'
      }
    })
    return config
  }
}
