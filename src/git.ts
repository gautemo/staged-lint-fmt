import { logError, logInfo } from './log.ts'

let stashPerformed = false

export function getModifiedFiles(staged: boolean) {
  const rootPath = runGit(['rev-parse', '--show-toplevel']).trim()
  const args = ['diff', '--name-only']
  if (staged) {
    args.push('--staged')
  }
  return runGit(args).split('\n').filter(Boolean).map((file) => `${rootPath}/${file}`)
}

export function gitAdd(files: string[]) {
  runGit(['add', ...files])
}

/*
git stash push --staged            # Stash staged changes
git stash                          # Stash everything else
git stash pop stash@{1}            # Restore staged changes stash
*/
export function gitStashKeepStaged() {
  stashPerformed = true
  runGit(['stash', 'push', '--staged', '-m', 'staged-lint-fmt staged stash'])
  runGit(['stash', '-m', 'staged-lint-fmt working directory stash'])
  runGit(['stash', 'pop', 'stash@{1}'])
}

export function gitStashPop() {
  runGit(['stash', 'pop'])
}

function runGit(args: string[]) {
  const command = new Deno.Command('git', {
    args,
  })
  const { code, stdout } = command.outputSync()
  if (code !== 0) {
    logError('failed due to a git error.')
    if (stashPerformed) {
      logInfo('Look at git stash list for potential lost changes.')
    }
    Deno.exit(1)
  }
  return new TextDecoder().decode(stdout)
}
