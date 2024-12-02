export function runDeno(arg: 'lint' | 'fmt', files: string[]) {
  console.log(`deno ${arg}:`)
  const command = new Deno.Command(Deno.execPath(), {
    args: [arg, ...files],
  })
  const {code, stderr} = command.outputSync()
  console.log(new TextDecoder().decode(stderr))
  return code === 0
}
