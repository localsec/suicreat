const readline = require('readline');
const { generateWallets } = require('./generate');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Nhập số lượng ví SUI muốn tạo: ', async (answer) => {
  const total = parseInt(answer);
  if (isNaN(total) || total <= 0) {
    console.log('❌ Vui lòng nhập số nguyên dương hợp lệ!');
    rl.close();
    return;
  }

  await generateWallets(total);
  rl.close();
});
