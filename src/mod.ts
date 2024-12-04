import { runDeno } from './deno.ts'
import { getStaged, gitAdd, gitStashKeepStaged, gitStashPop } from './git.ts'

const stagedFiles = getStaged()
gitStashKeepStaged()

const successLint = runDeno('lint', stagedFiles)
if (!successLint) {
  gitAdd(stagedFiles)
  gitStashPop()
  Deno.exit(1)
}
runDeno('fmt', stagedFiles)

gitAdd(stagedFiles)
gitStashPop()
