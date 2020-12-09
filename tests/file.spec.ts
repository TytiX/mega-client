import * as  dotenv from 'dotenv';
import * as path from 'path';
import { Writable } from 'stream';
dotenv.config({ path: path.resolve(__dirname + '/.env') });

import { File } from '../src/file'

const {
  MEGA_ACCESSIBLE_URL,
  MEGA_FILE_ID,
  MEGA_FILE_NAME,
  MEGA_FILE_CONTENT
} = process.env;

describe('file', () => {
  it('get file', () => {
    const file = File.fromURL(MEGA_ACCESSIBLE_URL);
    expect(file.downloadId).toBe(MEGA_FILE_ID);
  })
  it('load file attribute', () => {
    const file = File.fromURL(MEGA_ACCESSIBLE_URL);
    file.loadAttributes((err, file) => {
      expect(err).toBe(undefined);
      if (file) {
        expect(file.name).toBe(MEGA_FILE_NAME);
      }
    });
  })
  it('get file content', () => {
    const file = File.fromURL(MEGA_ACCESSIBLE_URL);
    var echoStream = new Writable();
    echoStream._write = function (chunk, encoding, done) {
      expect(chunk.toString()).toBe(MEGA_FILE_CONTENT);
      done();
    };
    file.download().pipe(echoStream);
  })
});
