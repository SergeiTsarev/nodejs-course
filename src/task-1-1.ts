import { createInterface } from 'readline';

const reverseString = (string: string): string => string.split('').reverse().join('');

const rl = createInterface({
  input: process.stdin,
});

rl.on('line', function (data) {
  const reversedInput = reverseString(data);
  process.stdout.write(`${reversedInput}\n\n`);
});
