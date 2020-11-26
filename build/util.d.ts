import through from 'through';
import { File } from './file';
declare function streamToCb(stream: any, cb: any): void;
declare function chunkSizeSafe(size: any): through.ThroughStream;
declare function detectSize(cb: any): through.ThroughStream;
declare function streamToPromise(stream: any, encoding?: string): Promise<unknown>;
declare function readMegaFiles(files: File[]): Promise<any[]>;
export { streamToCb, chunkSizeSafe, detectSize, streamToPromise, readMegaFiles };
