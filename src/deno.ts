import { logInfo } from './log.ts'

export function runDeno(arg: 'lint' | 'fmt', files: string[]) {
  logInfo(`deno ${arg}:`)
  const command = new Deno.Command(Deno.execPath(), {
    args: [arg, ...files],
  })
  const { code, stderr } = command.outputSync()
  const msg = new TextDecoder().decode(stderr)
  if (msg.includes('No target files found')) {
    return true
  }
  logInfo(msg)
  return code === 0
}
