import { runDeno } from './deno.ts'
import { getModifiedFiles, gitAdd, gitStashKeepStaged, gitStashPop } from './git.ts'

const stagedFiles = getModifiedFiles(true)
if (stagedFiles.length === 0) {
  console.log('staged-lint-fmt skipped: no staged files')
  Deno.exit(0)
}
const modifiedWorkdirFiles = getModifiedFiles(false)
const stashNeeded = stagedFiles.some((f) => modifiedWorkdirFiles.includes(f))
if (stashNeeded) {
  gitStashKeepStaged()
}

const successLint = runDeno('lint', stagedFiles)
if (!successLint) {
  if (stashNeeded) {
    gitAdd(stagedFiles)
    gitStashPop()
  }
  Deno.exit(1)
}
runDeno('fmt', stagedFiles)

gitAdd(stagedFiles)
if (stashNeeded) {
  gitStashPop()
}
