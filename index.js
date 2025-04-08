const readline = require('readline');
const { generateWallets } = require('./generate');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Nhập số lượng ví SUI cần tạo: ', async (answer) => {
  const totalWallets = parseInt(answer);

  if (isNaN(totalWallets) || totalWallets <= 0) {
    console.log('❌ Vui lòng nhập số hợp lệ.');
    rl.close();
    return;
  }

  await generateWallets(totalWallets);
  rl.close();
});
