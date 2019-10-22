const path = require('path');
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withTranspileModules = require('next-transpile-modules');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

let env;
switch (process.env.NODE_ENV) {
  case 'production':
    env = 'PROD';
    break;
  case 'staging':
    env = 'STAGING';
    break;
  case 'development':
    env = 'DEV';
    break;
  default:
    env = 'DEV';
    break;
}

const nextConfig = {
  target: 'serverless',
  /**
   * If some of the envs are public, like a google maps key, but you still
   * want to keep them secret from the repo, the following code will allow you
   * to share some variables with the client, configured at compile time.
   */
  env: {
    ENV: env,
    apiEntriesUrl:
      'https://cdn.contentful.com/spaces/mivicpf5zews/environments/master/entries',
    // Public token, not a secret
    tokenContentful:
      '102b6ce0b5beb8e64d0139b604153c92f7476229ee4d2ed5fa3608f2b72640e4',
  },
};

module.exports = withPlugins(
  [
    [
      withTranspileModules,
      {
        transpileModules: [],
        webpack: (config, options) => {
          process.env.BUNDLE_ANALYZE &&
            config.plugins.push(new BundleAnalyzerPlugin());

          config.plugins.push(
            new SWPrecacheWebpackPlugin({
              minify: true,
              runtimeCaching: [
                {
                  handler: 'networkFirst',
                  urlPattern: /^https?.*/,
                },
              ],
              staticFileGlobsIgnorePatterns: [/\.next\//],
            })
          );

          // Fixes npm packages that depend on `fs` module
          config.node = {
            fs: 'empty',
          };

          config.module.rules.push({
            test: /\.test.js$/,
            loader: 'ignore-loader',
          });

          config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          });

          config.module.rules.push({
            test: /\.(eot|woff|woff2)$/,
            loader: 'ignore-loader',
          });

          /* support absolute path */
          config.resolve.alias['~'] = __dirname;

          const usePolyfill = false;
          if (usePolyfill) {
            // https://stackoverflow.com/a/53311389/815507
            // https://github.com/zeit/next.js/issues/2060#issuecomment-385199026
            const originalEntry = config.entry;
            config.entry = async () => {
              const entries = await originalEntry();

              if (
                entries['main.js'] &&
                !entries['main.js'].includes('./client/polyfills.js')
              ) {
                entries['main.js'].unshift('./client/polyfills.js');
              }

              return entries;
            };
          }

          return config;
        },
      },
    ],
    //[withSass],

    [nextConfig],
    process.env.BUNDLE_ANALYZE && [
      // https://github.com/zeit/next-plugins/tree/master/packages/next-bundle-analyzer
      withBundleAnalyzer,
      {
        analyzeServer:
          true || ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser:
          true || ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: './server.html',
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: './client.html',
          },
        },
      },
    ],
  ].filter(Boolean)
);
