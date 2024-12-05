import { runDeno } from './deno.ts'
import { getModifiedFiles, gitAdd, gitStashKeepStaged, gitStashPop } from './git.ts'
import { logError, logInfo } from './log.ts'
import { parseArgs } from '@std/cli/parse-args'

const args = parseArgs(Deno.args)
if (args['only-fmt'] && args['only-lint']) {
  logError('invalid args')
  Deno.exit(1)
}

const stagedFiles = getModifiedFiles(true)
if (stagedFiles.length === 0) {
  logInfo('skipped: no staged files')
  Deno.exit(0)
}
const modifiedWorkdirFiles = getModifiedFiles(false)
const stashNeeded = stagedFiles.some((f) => modifiedWorkdirFiles.includes(f))
if (stashNeeded) {
  gitStashKeepStaged()
}

if (!args['only-fmt']) {
  const successLint = runDeno('lint', stagedFiles)
  if (!successLint) {
    if (stashNeeded) {
      gitAdd(stagedFiles)
      gitStashPop()
    }
    Deno.exit(1)
  }
}
if (!args['only-lint']) {
  runDeno('fmt', stagedFiles)
}

gitAdd(stagedFiles)
if (stashNeeded) {
  gitStashPop()
}
