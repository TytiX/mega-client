/// <reference types="node" />
/**
 * cryptoDecodePrivKey
 * @public
 * @argv privk Buffer Private key
 * @return Private Key
 * @source https://github.com/meganz/webclient/blob/542d98ec61340b1e4fbf0dae0ae457c1bc5d49aa/js/crypto.js#L1448
 */
declare function cryptoDecodePrivKey(privk: any): any;
/**
 * cryptoRsaDecrypt
 * @public
 * @argv ciphertext Buffer
 * @argv privkey Private Key
 * @return Buffer Decrypted plaintext
 * @source https://github.com/meganz/webclient/blob/4d95863d2cdbfb7652d16acdff8bae4b64056549/js/crypto.js#L1468
 */
declare function cryptoRsaDecrypt(ciphertext: any, privkey: any): Buffer;
export { cryptoDecodePrivKey, cryptoRsaDecrypt };
