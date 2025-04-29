// prepends the date to the log message
export function log(...args: any) {
  console.log((new Date()).toISOString(), ...args)
}
