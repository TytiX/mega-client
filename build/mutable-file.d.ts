/// <reference types="node" />
import { File } from './file';
declare class MutableFile extends File {
    constructor(opt: any, storage: any);
    loadAttributes(cb: (err?: Error, file?: File) => void): this;
    mkdir(opt: any, cb: any): void;
    upload(opt: any, source: any, cb: any): any;
    _upload(opt: any, source: any, type: any, cb: any): any;
    _uploadAttribute(opt: any, source: any, type: any, cb: any): void;
    _uploadWithSize(stream: any, size: any, source: any, pause: any, type: any, opt: any, cb: any): void;
    uploadAttribute(type: any, data: any, callback: any): void;
    delete(permanent: any, cb: any): this;
    moveTo(target: any, cb: any): this;
    setAttributes(attributes: any, cb: any): this;
    rename(filename: any, cb: any): this;
    setLabel(label: any, cb: any): this;
    setFavorite(isFavorite: any, cb: any): this;
    link(options: any, cb: any): this;
    shareFolder(options: any, cb: any): this | undefined;
    unshareFolder(options: any, cb: any): this;
    importFile(sharedFile: any, cb: any): any;
    static packAttributes(attributes: any): Buffer;
}
export default MutableFile;
