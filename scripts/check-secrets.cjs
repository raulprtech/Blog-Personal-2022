const fs = require('node:fs')
const { execFileSync } = require('node:child_process')

// Report locations, never matched values (including on CI failures).
const paths = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean)
const patterns = [
  /\bsk[A-Za-z0-9]{100,}\b/,
  /\b(?:ghp|github_pat)_[A-Za-z0-9_]{30,}\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /^\s*(?:export\s+)?[A-Z_]*(?:TOKEN|SECRET|API_KEY)[A-Z_]*\s*=\s*["']?(?!\s*$|["']?\s*$|\$|<|YOUR_|your_|example)[A-Za-z0-9_/-]{20,}/m,
]
let failures = 0
for (const file of paths) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) continue
  if (/(?:^|\/)\.env(?:\.|$)/.test(file) && !file.endsWith('.example')) {
    console.error(`Tracked environment file: ${file}`)
    failures++
  }
  const bytes = fs.readFileSync(file)
  if (bytes.includes(0)) continue
  bytes.toString('utf8').split(/\r?\n/).forEach((line, index) => {
    if (patterns.some((pattern) => pattern.test(line))) {
      console.error(`Possible credential: ${file}:${index + 1} (value redacted)`)
      failures++
    }
  })
}
if (failures) process.exitCode = 1
else console.log('No credential patterns found in tracked files.')
