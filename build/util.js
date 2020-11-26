"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMegaFiles = exports.streamToPromise = exports.detectSize = exports.chunkSizeSafe = exports.streamToCb = void 0;
const tslib_1 = require("tslib");
/* eslint-disable */
const through_1 = tslib_1.__importDefault(require("through"));
function streamToCb(stream, cb) {
    const chunks = [];
    let complete;
    stream.on('data', function (d) {
        chunks.push(d);
    });
    stream.on('end', function () {
        if (!complete) {
            complete = true;
            cb(null, Buffer.concat(chunks));
        }
    });
    stream.on('error', function (e) {
        if (!complete) {
            complete = true;
            cb(e);
        }
    });
}
exports.streamToCb = streamToCb;
function chunkSizeSafe(size) {
    let last;
    const stream = through_1.default((d) => {
        if (last)
            d = Buffer.concat([last, d]);
        const end = Math.floor(d.length / size) * size;
        if (!end) {
            last = last ? Buffer.concat([last, d]) : d;
        }
        else if (d.length > end) {
            last = d.slice(end);
            stream.emit('data', d.slice(0, end));
        }
        else {
            last = undefined;
            stream.emit('data', d);
        }
    }, () => {
        if (last)
            stream.emit('data', last);
        stream.emit('end');
    });
    return stream;
}
exports.chunkSizeSafe = chunkSizeSafe;
function detectSize(cb) {
    const chunks = [];
    let size = 0;
    const stream = through_1.default((d) => {
        chunks.push(d);
        size += d.length;
    }, function () {
        // function IS needed
        cb(size);
        chunks.forEach(stream.emit.bind(stream, 'data'));
        stream.emit('end');
    });
    return stream;
}
exports.detectSize = detectSize;
function streamToPromise(stream, encoding = "utf8") {
    return new Promise((resolve, reject) => {
        let data = "";
        stream.on("data", (chunk) => data += chunk);
        stream.on("end", () => resolve(data));
        stream.on("error", (error) => reject(error));
    });
}
exports.streamToPromise = streamToPromise;
function readMegaFiles(files) {
    const pfs = [];
    for (const f of files) {
        pfs.push(streamToPromise(f.download()));
    }
    return Promise.all(pfs);
}
exports.readMegaFiles = readMegaFiles;
//# sourceMappingURL=util.js.map