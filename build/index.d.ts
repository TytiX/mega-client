import { megaEncrypt, megaDecrypt } from './crypto';
import Storage from './storage';
declare function mega(options: any, cb: any): Storage;
declare namespace mega {
    var Storage: typeof import("./storage").default;
    var File: typeof import("./file").File;
    var file: typeof import("./file").File.fromURL;
    var encrypt: typeof megaEncrypt;
    var decrypt: typeof megaDecrypt;
}
export default mega;
export * from './file';
export * from './mutable-file';
export * from './util';
export * from './storage';
