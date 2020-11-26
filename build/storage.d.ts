/// <reference types="node" />
import { EventEmitter } from 'events';
declare class Storage extends EventEmitter {
    api: any;
    files: any;
    options: any;
    status: string;
    name: any;
    user: any;
    email: any;
    inbox: any;
    trash: any;
    sid: any;
    key: any;
    aes: any;
    RSAPrivateKey: any;
    root: any;
    mounts: any;
    shareKeys: any;
    constructor(options: any, cb?: any);
    login(cb: any): void;
    reload(force: any, cb: any): any;
    _importFile(f: any): any;
    mkdir(opt: any, cb: any): any;
    upload(opt: any, buffer: any, cb: any): any;
    close(): void;
    getAccountInfo(cb: any): void;
    toJSON(): {
        key: any;
        sid: any;
        name: any;
        user: any;
        options: any;
    };
    static fromJSON(json: any): Storage;
}
export default Storage;
