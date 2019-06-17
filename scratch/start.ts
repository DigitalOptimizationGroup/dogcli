var appTypeId: string = configstore.get('appType')

console.log('Building your app...')

if (flags.onlyfunctions) {
  throw Error('Implement dev server with only functions')
}

var script: string = ''
if (appTypeId === 'cra') {
  this.log()
  this.log('Building app for deployment...')
  this.log()

  script = await build(
    'build',
    'dev',
    flags.routes || 'routes.json',
    flags.functions
  )
} else if (appTypeId === 'rawWorker') {
  var scriptPath = configstore.get('scriptPath')
  if (scriptPath === undefined) {
    scriptPath = await askForScriptPath()
  }
  this.log()

  script = fs.readFileSync(scriptPath, 'utf8')
} else if (appTypeId === 'awsLambdaGateway') {
  script = fs.readFileSync(
    path.join(__dirname, '../dev-lambda-proxy.js'),
    'utf8'
  )
} else {
  this.log(
    'Your Application Type has not been set. Trying running dog apps:init.'
  )
  process.exit()
}

const port = flags.port || 3000
let server = new Cloudworker(script, {debug: true}).listen(port)
console.log(`Listening on ${port}`)

process.on('uncaughtException', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    this.log(`
${logSymbols.error} Port ${err.port} is in use

Please use the --port flag to set a different port:

dog start --port ${err.port + 1}
`)
  } else {
    this.log(
      logSymbols.error,
      'Error starting development server, please try again.'
    )
  }
  process.exit(1)
})

let stopping = false
let reloading = false

// maybe we'd like to also watch adding files
if (flags.watch) {
  chokidar.watch(['dist/worker.js']).on('change', (event, path) => {
    reloading = true
    console.log('Changes to build folder detected - reloading...')

    server.close(async () => {
      if (stopping) return

      reloading = false

      const newScript = fs.readFileSync('./dist/worker.js', 'utf8')

      console.log('Successfully reloaded!')

      server = new Cloudworker(newScript).listen(port)
    })
  })
  // chokidar
  //   .watch([
  //     'build',
  //     ...(flags.functions ? [flags.functions] : []),
  //     ...(flags.routes ? [flags.routes] : [])
  //   ])
  //   .on('change', (event, path) => {
  //     reloading = true
  //     console.log('Changes to build folder detected - reloading...')

  //     server.close(async () => {
  //       if (stopping) return

  //       reloading = false

  //       const newScript = await build(
  //         'build',
  //         'dev',
  //         flags.routes || 'routes.json',
  //         flags.functions
  //       )

  //       console.log('Successfully reloaded!')

  //       server = new Cloudworker(newScript).listen(port)
  //     })
  //   })
}

function shutdown() {
  if (stopping) return

  stopping = true
  console.log('\nShutting down...')
  server.close(terminate)

  if (reloading) server.on('close', terminate)
}

function terminate() {
  console.log('Goodbye!')
  process.exit(0)
}

process.on('SIGINT', () => {
  shutdown()
})

process.on('SIGTERM', () => {
  shutdown()
})
