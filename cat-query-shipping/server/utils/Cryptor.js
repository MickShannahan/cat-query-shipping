const bcrypt = require('bcryptjs')

export function cryptIt(str) {
  const encode = str.split('').reverse().join('')
  const code1 = encode.slice(0, 12)
  const code2 = encode.slice(12)
  return Buffer.from(code2 + code1).toString('base64')
}

export function deCryptIt(str64) {
  const str = Buffer.from(str64, 'base64').toString()
  const code1 = str.slice(0, 12)
  const code2 = str.slice(12)
  const decode = (code2 + code1).split('').reverse().join('')
  return decode
}

export function hashIt(str) {
  const hash = bcrypt.hashSync(str, 10)
  return hash
}

export function compareHash(str, hash) {
  return bcrypt.compareSync(str, hash)
}
