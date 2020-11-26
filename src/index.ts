import { megaEncrypt, megaDecrypt } from './crypto'
import Storage from './storage'
import { File } from './file'

// just for backyards compatibility: is better requiring
// File and Storage directly as built sizes will be smaller

function mega (options: any, cb: any) {
  return new Storage(options, cb)
}

mega.Storage = Storage
mega.File = File
mega.file = File.fromURL
mega.encrypt = megaEncrypt
mega.decrypt = megaDecrypt

export default mega

export * from './file'
export * from './mutable-file'
export * from './util'
export * from './storage'
