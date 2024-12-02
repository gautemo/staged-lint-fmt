import { runDeno } from './deno.ts'
import { getStaged, gitAdd, gitStash, gitStashPop } from './git.ts'

const stagedFiles = getStaged()
gitStash()

const successLint = runDeno('lint', stagedFiles)
if(!successLint) {
  gitStashPop()
  Deno.exit(1)
}
runDeno('fmt', stagedFiles)

gitAdd(stagedFiles)
gitStashPop()

