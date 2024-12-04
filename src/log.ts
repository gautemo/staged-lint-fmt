export function logInfo(msg: string) {
  console.log(`%c[staged-lint-fmt]%c ${msg}`, 'color: yellow', 'color: unset')
}

export function logError(msg: string) {
  console.error(`%c[staged-lint-fmt] ${msg}`, 'color: red')
}
