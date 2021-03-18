import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
});

rl.on('line', function (data) {
  const reversedInput = data.split('').reverse().join('');
  process.stdout.write(`${reversedInput}\n\n`);
});
