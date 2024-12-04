export function runDeno(arg: 'lint' | 'fmt', files: string[]) {
  console.log(`deno ${arg}:`)
  const command = new Deno.Command(Deno.execPath(), {
    args: [arg, ...files],
  })
  const {code, stderr} = command.outputSync()
  const msg = new TextDecoder().decode(stderr)
  if(msg === 'error: No target files found.') {
    return true
  }
  console.log(msg)
  return code === 0
}
