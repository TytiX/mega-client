import * as  dotenv from 'dotenv';
import * as path from 'path';
import fs from 'fs';
dotenv.config({ path: path.resolve(__dirname + '/.env') });

import Storage from '../src/storage';

const {
  MEGA_EMAIL,
  MEGA_PASSWORD,
  MEGA_UPLOAD_FILE_NAME,
  MEGA_UPLOAD_FOLDER_NAME,
  MEGA_UPLOAD_ROOT_FOLDER
} = process.env;

const findFolderByName = (storage: Storage, folderName?: string) => {
  return storage.root.children.find(f => {
    return f.directory === true && f.name === folderName;
  });
}

describe('api', () => {
  const options = {
    email: MEGA_EMAIL,
    password: MEGA_PASSWORD
  };

  it('create storage callback', (done) => {
    const storage = new Storage({ ...options }, () => {
      expect(storage.email).toBe(MEGA_EMAIL);
      storage.close();
      done();
    });
  });
  it('create storage event', (done) => {
    var storage = new Storage({ ...options });
    storage.on('ready', (s) => {
      expect(s.email).toBe(MEGA_EMAIL);
      s.close();
      done();
    });
  });

  // TODO: not working suddenly
  // it('upload file to storage', (done) => {
  //   var storage = new Storage({ ...options });
  //   storage.on('ready', (s) => {
  //     let target = findFolderByName(s, MEGA_UPLOAD_ROOT_FOLDER);

  //     fs.createReadStream(path.resolve(__dirname + '/test-file.txt')).pipe(s.upload({
  //       name: MEGA_UPLOAD_FILE_NAME,
  //       target
  //     }, (err, file) => {
  //       expect(err).toBe(null);
  //       expect(file.name).toBe(MEGA_UPLOAD_FILE_NAME);
  //       expect(file.directory).toBe(false);
  //       s.close();
  //       done();
  //     }));

  //   });
  // });
  it('create folder storage', (done) => {
    var storage = new Storage({ ...options });
    storage.on('ready', (s) => {
      const target = findFolderByName(s, MEGA_UPLOAD_ROOT_FOLDER);

      s.mkdir({
        name: MEGA_UPLOAD_FOLDER_NAME,
        target
      }, (err, file) => {
        expect(err).toBe(null);
        expect(file.name).toBe(MEGA_UPLOAD_FOLDER_NAME);
        expect(file.directory).toBe(true);
        s.close();
        done();
      });
    });
  });

});
