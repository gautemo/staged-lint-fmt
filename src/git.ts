export function getStaged() {
  const stagedFiles = runGit(['diff', '--name-only', '--staged']).split('\n').filter(Boolean)
  if (stagedFiles.length === 0) {
    console.log('staged-lint-fmt skipped: no staged files')
    Deno.exit(0)
  }
  return stagedFiles
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
  runGit(['stash', 'push', '--staged', '-m', 'staged-lint-fmt staged stash'])
  runGit(['stash', '-m', 'staged-lint-fmt working directory stash'])
  runGit(['stash', 'pop', 'stash@{1}'])
  // Deno.exit(1)
}

export function gitStashPop() {
  runGit(['stash', 'pop'])
}

function runGit(args: string[]) {
  const command = new Deno.Command('git', {
    args,
  })
  const { code, stdout, stderr } = command.outputSync()
  if (code !== 0) {
    console.error(new TextDecoder().decode(stderr))
    Deno.exit(1)
  }
  return new TextDecoder().decode(stdout)
}
