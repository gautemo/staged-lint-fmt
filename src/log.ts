import { blue, red } from '@std/fmt/colors'

export function logInfo(msg: string) {
  console.log(`${blue('[staged-lint-fmt]')} ${msg.trim()}`)
}

export function logError(msg: string) {
  console.error(red(`[staged-lint-fmt] ${msg.trim()}`))
}
