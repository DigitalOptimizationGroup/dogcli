const spawn = require('cross-spawn')

export const execSync = (command: string, args: Array<string>) => {
  const proc = spawn.sync(command, args, {stdio: 'inherit'})
  if (proc.status !== 0) {
    console.error(`\`${command} ${args.join(' ')}\` failed`)
    return
  }
  return
}
