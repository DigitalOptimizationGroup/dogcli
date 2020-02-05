const fs = require('fs'),
  path = require('path')

function walkDir(dir: string, callback: Function) {
  fs.readdirSync(dir).forEach((f: any) => {
    let dirPath = path.join(dir, f)
    let isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
  })
}

export function bundleBuildFolder(buildDir = './build') {
  const assets: {fileName: string; source: string}[] = []

  walkDir(buildDir, function(fileName: string) {
    var fileContents
    // normalize for windows
    const normalizedFileName = fileName
      .split(path.sep)
      // .slice(1)
      .join('/')

    if (normalizedFileName.match(/\.(ico|gif|png|jpe?g|svg)$/i) !== null) {
      // if we have an image we convert the buffer to base64 so we can bundle it into our script
      fileContents = fs.readFileSync(fileName).toString('base64')
    } else {
      fileContents = fs.readFileSync(fileName, 'utf8')
    }

    if (normalizedFileName.endsWith('.map')) return

    assets.push({
      fileName: normalizedFileName,
      source: fileContents
    })
  })

  const final = assets.reduce((acc: any, resource: any) => {
    return {...acc, [resource.fileName]: resource.source}
  }, {})

  return final
}
