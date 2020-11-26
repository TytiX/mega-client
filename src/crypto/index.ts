/* eslint-disable */
import through from 'through'
import pipeline from 'stream-combiner'
import { chunkSizeSafe } from '../util'
// import secureRandom from 'secure-random'
import { AES, CTR, prepareKey, prepareKeyV2 } from './aes'

export { AES, CTR, prepareKey, prepareKeyV2 }

function d64 (s: any) {
  return Buffer.from(s, 'base64')
}
// URL Safe Base64 encode/decode
function e64 (buffer: any) {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export { e64, d64 }

function unmergeKeyMac (key: any) {
  const newKey = Buffer.alloc(32)
  key.copy(newKey)

  for (let i = 0; i < 16; i++) {
    newKey.writeUInt8(newKey.readUInt8(i) ^ newKey.readUInt8(16 + i), i)
  }

  return newKey
}

function mergeKeyMac (key: any, mac: any) {
  const newKey = Buffer.alloc(32)
  key.copy(newKey)
  mac.copy(newKey, 24)

  for (let i = 0; i < 16; i++) {
    newKey.writeUInt8(newKey.readUInt8(i) ^ newKey.readUInt8(16 + i), i)
  }

  return newKey
}

export { unmergeKeyMac, mergeKeyMac }

export function formatKey (key: any) {
  return typeof key === 'string' ? d64(key) : key
}

export function getCipher (key: any) {
  return new AES(unmergeKeyMac(key).slice(0, 16))
}

function megaEncrypt (key: any, options: any = {}) {
  const start = options.start || 0
  if (start !== 0) {
    throw Error('Encryption cannot start midstream otherwise MAC verification will fail.')
  }
  key = formatKey(key)

  if (!key) {
    // key = secureRandom(24)
  }
  if (!(key instanceof Buffer)) {
    key = Buffer.from(key)
  }

  const aes = new AES(key.slice(0, 16))
  const ctr: any = new CTR(aes, key.slice(16), start)

  let stream = through( (d: any) => {
    ctr.encrypt(d)
    stream.emit('data', d)
  }, () => {
    (stream as any).key = mergeKeyMac(key, ctr.condensedMac())
    stream.emit('end')
  });

  if (key.length !== 24) {
    return process.nextTick(() => {
      stream.emit('error', Error('Wrong key length. Key must be 192bit.'))
    })
  }

  stream = pipeline(chunkSizeSafe(16), stream)
  return stream
}

function megaDecrypt (key: any, options: any = {}) {
  const start = options.start || 0
  if (start !== 0) options.disableVerification = true
  if (start % 16 !== 0) throw Error('start argument of megaDecrypt must be a multiple of 16')
  key = formatKey(key)

  const aes = getCipher(key)
  const ctr: any = new CTR(aes, key.slice(16), start)

  let stream = through((d: any) => {
    ctr.decrypt(d)
    stream.emit('data', d)
  }, () => {
    const mac = ctr.condensedMac()
    if (!mac.equals(key.slice(24)) && !options.disableVerification) {
      return stream.emit('error', Error('MAC verification failed'))
    }
    stream.emit('end')
  })

  stream = pipeline(chunkSizeSafe(16), stream)
  return stream
}

export { megaEncrypt, megaDecrypt }


function constantTimeCompare (bufferA: any, bufferB: any) {
  if (bufferA.length !== bufferB.length) return false

  const len = bufferA.length
  let result = 0

  for (let i = 0; i < len; i++) {
    result |= bufferA[i] ^ bufferB[i]
  }

  return result === 0
}

export { constantTimeCompare }
