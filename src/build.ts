var webpack = require('webpack')
var MemoryFileSystem = require('memory-fs')
var memoryFs = new MemoryFileSystem()
var fs = require('fs')
var prettyBytes = require('pretty-bytes')
const path = require('path')
const rimraf = require('rimraf')
import {bundleAssets} from './cf-assets'
import {configstore} from './configstore'

// option to write your own webpack config?
const webpackConfig = (config: any) => ({
  entry: {worker: path.resolve(__dirname, 'scripts/src/index.js')},
  target: 'webworker',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              [
                require.resolve('@babel/preset-env'),
                {
                  targets: {chrome: '70'}
                }
              ]
            ],
            plugins: [
              //['@babel/plugin-transform-react-jsx'],
              require.resolve('@babel/plugin-proposal-export-default-from'),
              require.resolve('@babel/plugin-proposal-class-properties')
            ]
          }
        }
      }
    ]
  },
  plugins: [
    // pass in environment variables here
    new webpack.DefinePlugin({
      PROJECT_ID: JSON.stringify(config.projectId),
      APP_HASH: JSON.stringify(config.appHash),
      COLOR: JSON.stringify(config.color)
    })
  ]
})

export function build(
  buildDir: string,
  color: string,
  routesFile: string,
  functionsFile?: string
) {
  const compiler = webpack(
    webpackConfig({
      projectId: configstore.get('projectId'),
      // if we do this server side then the hash could be of uploaded files
      appHash: 'app-hash-123',
      color
    })
  )
  compiler.inputFileSystem = fs
  compiler.resolvers.normal.fileSystem = memoryFs
  compiler.outputFileSystem = memoryFs

  rimraf.sync(path.resolve(__dirname, 'tmp-dog-build'))
  fs.mkdirSync(path.resolve(__dirname, 'tmp-dog-build'))

  let cacheConfig = JSON.stringify({'/': []})

  if (routesFile !== undefined) {
    try {
      cacheConfig = fs.readFileSync(routesFile, 'utf8')
    } catch (e) {}
  }

  fs.writeFileSync(
    path.resolve(__dirname, 'tmp-dog-build/pre-cache-manifest.json'),
    cacheConfig
  )

  let functionFile = `export const functions = {}`
  if (functionsFile !== undefined) {
    try {
      functionFile = fs.readFileSync(functionsFile, 'utf8')
    } catch (e) {}
  }

  fs.writeFileSync(
    path.resolve(__dirname, 'tmp-dog-build/functions.js'),
    functionFile
  )

  const assets = bundleAssets(buildDir)

  fs.writeFileSync(
    path.resolve(__dirname, 'tmp-dog-build/client-assets.js'),
    assets
  )

  return new Promise<string>((res, rej) => {
    compiler.run((err: any, stats: any) => {
      console.log(
        `Final bundle size: ${prettyBytes(
          stats.compilation.assets['worker.js'].size()
        )}`
      )
      if (err) rej(err)
      const result = stats.compilation.assets['worker.js'].source()
      res(result)
    })
  })
}
