/* eslint-disable */
import through from 'through'
import { File } from './file'

function streamToCb (stream: any, cb: any) {
  const chunks: any = []
  let complete: any
  stream.on('data', function (d: any) {
    chunks.push(d)
  })
  stream.on('end', function () {
    if (!complete) {
      complete = true
      cb(null, Buffer.concat(chunks))
    }
  })
  stream.on('error', function (e: any) {
    if (!complete) {
      complete = true
      cb(e)
    }
  })
}

function chunkSizeSafe (size: any) {
  let last: any
  const stream = through((d: any) => {
    if (last) d = Buffer.concat([last, d])

    const end = Math.floor(d.length / size) * size

    if (!end) {
      last = last ? Buffer.concat([last, d]) : d
    } else if (d.length > end) {
      last = d.slice(end)
      stream.emit('data', d.slice(0, end))
    } else {
      last = undefined
      stream.emit('data', d)
    }
  }, () => {
    if (last) stream.emit('data', last)
    stream.emit('end')
  });
  return stream
}

function detectSize (cb: any) {
  const chunks: any = []
  let size = 0
  const stream = through((d: any) => {
    chunks.push(d)
    size += d.length
  }, function () {
    // function IS needed
    cb(size)
    chunks.forEach(stream.emit.bind(stream, 'data'))
    stream.emit('end')
  })
  return stream
}

function streamToPromise(stream: any, encoding = "utf8") {
  return new Promise((resolve, reject) => {
    let data = "";
    
    stream.on("data", (chunk: any) => data += chunk);
    stream.on("end", () => resolve(data));
    stream.on("error", (error: any) => reject(error));
  });
}


function readMegaFiles(files: File[]): Promise<any[]> {
  const pfs: any = [];
  for(const f of files) {
    pfs.push(
      streamToPromise(
        (f as any).download()
      )
    );
  }
  return Promise.all<any>(pfs);
}

export {streamToCb, chunkSizeSafe, detectSize, streamToPromise, readMegaFiles}
