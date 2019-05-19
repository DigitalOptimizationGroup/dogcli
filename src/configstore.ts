const Configstore = require('configstore')
const pkg = require('../package.json')

export const configstore = new Configstore(pkg.name)
