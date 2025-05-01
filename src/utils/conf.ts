// Reads configuration from environment variables
// and errors out if any are missing.

// See example.env for comments about these settings
const conf = {
  LISTEN_PORT: process.env.LISTEN_PORT,
  OWM_API_URL: process.env.OWM_API_URL,
  OWM_API_KEY: process.env.OWM_API_KEY,
}

export default conf

const missingSettings: string[] = []
for (const [k, v] of Object.entries(conf))
  if (v === '' || v === undefined)
    missingSettings.push(k)

if (missingSettings.length)
  throw Error(`Missing from env:\n${missingSettings.join('\n')}`)
