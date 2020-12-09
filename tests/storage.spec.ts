import * as  dotenv from 'dotenv';
import * as path from 'path';
import { Readable } from 'stream';
dotenv.config({ path: path.resolve(__dirname + '/.env') });

import Storage from '../src/storage';

const {
  MEGA_EMAIL,
  MEGA_PASSWORD,
  MEGA_UPLOAD_FILE_NAME,
  MEGA_UPLOAD_FOLDER_NAME,
  MEGA_UPLOAD_ROOT_FOLDER
} = process.env;

describe('api', () => {
  const options = {
    email: MEGA_EMAIL,
    password: MEGA_PASSWORD
  };
  it('create storage callback', () => {
    const storage = new Storage({ ...options }, () => {
      expect(storage.email).toBe(MEGA_EMAIL);
      storage.close();
    });
  });
  it('create storage event', () => {
    var storage = new Storage({ ...options });
    storage.on('ready', (s) => {
      expect(s.email).toBe(MEGA_EMAIL);
      s.close();
    });
  });

  it('upload file to storage', () => {
    var storage = new Storage({ ...options });
    storage.on('ready', (s) => {
      Readable.from([Buffer.from('test')]).pipe(s.upload({
        name: MEGA_UPLOAD_FILE_NAME,
        // target: MEGA_UPLOAD_ROOT_FOLDER
      }))
      s.close();
    });
  });
  it('create folder storage', () => {
    var storage = new Storage({ ...options });
    storage.on('ready', (s) => {
      s.mkdir({
        name: MEGA_UPLOAD_FOLDER_NAME,
        // target: MEGA_UPLOAD_ROOT_FOLDER
      }, (err, file) => {
        expect(err).toBe(null);
        expect(file.name).toBe(MEGA_UPLOAD_FOLDER_NAME);
        expect(file.directory).toBe(true);
      });
      s.close();
    });
  });
  
});