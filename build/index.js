"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = require("./crypto");
const storage_1 = tslib_1.__importDefault(require("./storage"));
const file_1 = require("./file");
// just for backyards compatibility: is better requiring
// File and Storage directly as built sizes will be smaller
function mega(options, cb) {
    return new storage_1.default(options, cb);
}
mega.Storage = storage_1.default;
mega.File = file_1.File;
mega.file = file_1.File.fromURL;
mega.encrypt = crypto_1.megaEncrypt;
mega.decrypt = crypto_1.megaDecrypt;
exports.default = mega;
tslib_1.__exportStar(require("./file"), exports);
tslib_1.__exportStar(require("./mutable-file"), exports);
tslib_1.__exportStar(require("./util"), exports);
tslib_1.__exportStar(require("./storage"), exports);
//# sourceMappingURL=index.js.map