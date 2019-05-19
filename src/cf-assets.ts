const fs = require('fs'),
  path = require('path')

function walkDir(dir: string, callback: Function) {
  fs.readdirSync(dir).forEach((f: any) => {
    let dirPath = path.join(dir, f)
    let isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
  })
}

// rawLoader taken from https://github.com/webpack-contrib/raw-loader/blob/master/index.js
const rawLoader = (source: string) =>
  JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

export const bundleAssets = (buildDir = './build') => {
  const assets: Array<any> = []

  walkDir(buildDir, function(fileName: string) {
    var fileContents

    if (fileName.match(/\.(ico|gif|png|jpe?g|svg)$/i) !== null) {
      // if we have an image we convert the buffer to base64 so we can bundle it into our script
      fileContents = fs.readFileSync(fileName).toString('base64')
    } else {
      fileContents = fs.readFileSync(fileName, 'utf8')
    }

    assets.push({
      fileName,
      source: rawLoader(fileContents)
    })
  })

  const final = assets.reduce((acc, resource) => {
    return `${acc}"/${resource.fileName}": ${resource.source},`
  }, '')

  // write out to a file we can use to serve the assets directly from our Cloudflare worker
  //fs.writeFileSync('./build/client-assets.js', `module.exports={` + final + '}')

  return `module.exports={` + final + '}'
}
