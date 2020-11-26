/// <reference types="node" />
import through from 'through';
import { AES, CTR, prepareKey, prepareKeyV2 } from './aes';
export { AES, CTR, prepareKey, prepareKeyV2 };
declare function d64(s: any): Buffer;
declare function e64(buffer: any): any;
export { e64, d64 };
declare function unmergeKeyMac(key: any): Buffer;
declare function mergeKeyMac(key: any, mac: any): Buffer;
export { unmergeKeyMac, mergeKeyMac };
export declare function formatKey(key: any): any;
export declare function getCipher(key: any): AES;
declare function megaEncrypt(key: any, options?: any): void | through.ThroughStream;
declare function megaDecrypt(key: any, options?: any): through.ThroughStream;
export { megaEncrypt, megaDecrypt };
declare function constantTimeCompare(bufferA: any, bufferB: any): boolean;
export { constantTimeCompare };
