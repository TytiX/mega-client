/// <reference types="node" />
import { EventEmitter } from 'events';
export declare const LABEL_NAMES: string[];
export declare class File extends EventEmitter {
    downloadId: any;
    key: string;
    type: number;
    directory: boolean;
    api: any;
    loadedFile: any;
    timestamp: number;
    size: any;
    owner: any;
    name?: string;
    attributes: any;
    label?: string;
    favorited: boolean;
    storage: any;
    nodeId: any;
    parent: any;
    children: any;
    constructor(opt: any);
    get createdAt(): number | undefined;
    checkConstructorArgument(value: any): void;
    loadMetadata(aes: any, opt: any): void;
    decryptAttributes(at: any): this;
    parseAttributes(at: any): void;
    loadAttributes(cb: (err?: Error, file?: File) => void): this;
    download(options: any, cb: any): any;
    link(options: any, cb: (err: string | null, url: string) => {}): void;
    static fromURL(opt: string | any): File;
    static unpackAttributes(at: any): any;
}
