/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class API extends EventEmitter {
    keepalive: any;
    counterId: any;
    gateway: any;
    requestModule: any;
    sid: any;
    sn: any;
    constructor(keepalive: any);
    request(json: any, cb: any, retryno?: number): void;
    pull(sn: any, retryno?: number): void;
    wait(url: any, sn: any): void;
    close(): void;
}
