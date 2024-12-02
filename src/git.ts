export function getStaged() {
  const command = new Deno.Command('git', {
    args: [
      'diff',
      '--name-only',
      '--staged',
    ],
  })
  const {code, stdout, stderr} = command.outputSync()
  if (code !== 0) {
    throw new Error(new TextDecoder().decode(stderr))
  }
  const stagedFiles = new TextDecoder().decode(stdout).split('\n').filter(Boolean)
  if (stagedFiles.length === 0) {
    console.log('staged-lint-fmt skipped: no staged files')
    Deno.exit(0)
  }
  return stagedFiles
}

export function gitAdd(files: string[]) {
  const command = new Deno.Command('git', {
    args: [
      'add',
      ...files,
    ],
  })
  const {code, stderr} = command.outputSync()
  if (code !== 0) {
    throw new Error(new TextDecoder().decode(stderr))
  }
}

export function gitStash() {
  const command = new Deno.Command('git', {
    args: [
      'stash',
      'push',
      '--keep-index',
    ],
  })
  const {code, stderr} = command.outputSync()
  if (code !== 0) {
    throw new Error(new TextDecoder().decode(stderr))
  }
}

export function gitStashPop() {
  const command = new Deno.Command('git', {
    args: [
      'stash',
      'pop',
    ],
  })
  const {code, stderr} = command.outputSync()
  if (code !== 0) {
    throw new Error(new TextDecoder().decode(stderr))
  }
}