/// <reference types="node" />
export declare function prepareKey(password: any): Buffer;
export declare function prepareKeyV2(password: any, info: any, cb: any): void;
declare class AES {
    key: any;
    constructor(key: any);
    encryptCBC(buffer: any): Buffer;
    decryptCBC(buffer: any): Buffer;
    stringhash(buffer: any): Buffer;
    encryptECB(buffer: any): Buffer;
    decryptECB(buffer: any): Buffer;
}
declare class CTR {
    key: any;
    nonce: any;
    encryptCipher: any;
    encrypt: any;
    decryptCipher: any;
    decrypt: any;
    macCipher: any;
    posNext: any;
    increment: any;
    pos: any;
    macs: any;
    mac: any;
    constructor(aes: any, nonce: any, start?: number);
    condensedMac(): Buffer;
    _encrypt(buffer: any): any;
    _decrypt(buffer: any): any;
    checkMacBounding(): void;
    incrementCTRBuffer(buf: any, cnt: any): void;
}
export { AES, CTR };
