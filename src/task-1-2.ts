import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';
import path from 'path';

const INPUT_FILE_PATH = path.join(__dirname, 'csv', 'input.csv');
const OUTPUT_FILE_PATH = path.join(__dirname, 'output.txt');

const errorHandler = (err: Error) => console.log(err);
const successHandler = () =>
  process.stdout.write(`${OUTPUT_FILE_PATH} has been successfully updated\n`);

const readStream = createReadStream(INPUT_FILE_PATH);
const writeStream = createWriteStream(OUTPUT_FILE_PATH);

readStream.on('error', errorHandler);
writeStream.on('error', errorHandler);
writeStream.on('close', successHandler);

readStream.pipe(csv()).pipe(writeStream);
