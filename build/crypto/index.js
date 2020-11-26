"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constantTimeCompare = exports.megaDecrypt = exports.megaEncrypt = exports.getCipher = exports.formatKey = exports.mergeKeyMac = exports.unmergeKeyMac = exports.d64 = exports.e64 = exports.prepareKeyV2 = exports.prepareKey = exports.CTR = exports.AES = void 0;
const tslib_1 = require("tslib");
/* eslint-disable */
const through_1 = tslib_1.__importDefault(require("through"));
const stream_combiner_1 = tslib_1.__importDefault(require("stream-combiner"));
const util_1 = require("../util");
// import secureRandom from 'secure-random'
const aes_1 = require("./aes");
Object.defineProperty(exports, "AES", { enumerable: true, get: function () { return aes_1.AES; } });
Object.defineProperty(exports, "CTR", { enumerable: true, get: function () { return aes_1.CTR; } });
Object.defineProperty(exports, "prepareKey", { enumerable: true, get: function () { return aes_1.prepareKey; } });
Object.defineProperty(exports, "prepareKeyV2", { enumerable: true, get: function () { return aes_1.prepareKeyV2; } });
function d64(s) {
    return Buffer.from(s, 'base64');
}
exports.d64 = d64;
// URL Safe Base64 encode/decode
function e64(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
exports.e64 = e64;
function unmergeKeyMac(key) {
    const newKey = Buffer.alloc(32);
    key.copy(newKey);
    for (let i = 0; i < 16; i++) {
        newKey.writeUInt8(newKey.readUInt8(i) ^ newKey.readUInt8(16 + i), i);
    }
    return newKey;
}
exports.unmergeKeyMac = unmergeKeyMac;
function mergeKeyMac(key, mac) {
    const newKey = Buffer.alloc(32);
    key.copy(newKey);
    mac.copy(newKey, 24);
    for (let i = 0; i < 16; i++) {
        newKey.writeUInt8(newKey.readUInt8(i) ^ newKey.readUInt8(16 + i), i);
    }
    return newKey;
}
exports.mergeKeyMac = mergeKeyMac;
function formatKey(key) {
    return typeof key === 'string' ? d64(key) : key;
}
exports.formatKey = formatKey;
function getCipher(key) {
    return new aes_1.AES(unmergeKeyMac(key).slice(0, 16));
}
exports.getCipher = getCipher;
function megaEncrypt(key, options = {}) {
    const start = options.start || 0;
    if (start !== 0) {
        throw Error('Encryption cannot start midstream otherwise MAC verification will fail.');
    }
    key = formatKey(key);
    if (!key) {
        // key = secureRandom(24)
    }
    if (!(key instanceof Buffer)) {
        key = Buffer.from(key);
    }
    const aes = new aes_1.AES(key.slice(0, 16));
    const ctr = new aes_1.CTR(aes, key.slice(16), start);
    let stream = through_1.default((d) => {
        ctr.encrypt(d);
        stream.emit('data', d);
    }, () => {
        stream.key = mergeKeyMac(key, ctr.condensedMac());
        stream.emit('end');
    });
    if (key.length !== 24) {
        return process.nextTick(() => {
            stream.emit('error', Error('Wrong key length. Key must be 192bit.'));
        });
    }
    stream = stream_combiner_1.default(util_1.chunkSizeSafe(16), stream);
    return stream;
}
exports.megaEncrypt = megaEncrypt;
function megaDecrypt(key, options = {}) {
    const start = options.start || 0;
    if (start !== 0)
        options.disableVerification = true;
    if (start % 16 !== 0)
        throw Error('start argument of megaDecrypt must be a multiple of 16');
    key = formatKey(key);
    const aes = getCipher(key);
    const ctr = new aes_1.CTR(aes, key.slice(16), start);
    let stream = through_1.default((d) => {
        ctr.decrypt(d);
        stream.emit('data', d);
    }, () => {
        const mac = ctr.condensedMac();
        if (!mac.equals(key.slice(24)) && !options.disableVerification) {
            return stream.emit('error', Error('MAC verification failed'));
        }
        stream.emit('end');
    });
    stream = stream_combiner_1.default(util_1.chunkSizeSafe(16), stream);
    return stream;
}
exports.megaDecrypt = megaDecrypt;
function constantTimeCompare(bufferA, bufferB) {
    if (bufferA.length !== bufferB.length)
        return false;
    const len = bufferA.length;
    let result = 0;
    for (let i = 0; i < len; i++) {
        result |= bufferA[i] ^ bufferB[i];
    }
    return result === 0;
}
exports.constantTimeCompare = constantTimeCompare;
//# sourceMappingURL=index.js.map