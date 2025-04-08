const fs = require('fs');
const path = require('path');
const { Ed25519Keypair } = require('@mysten/sui.js/keypairs/ed25519');
const { Mnemonic } = require('@mysten/sui.js/cryptography');
const { OUTPUT_DIR, OUTPUT_FILE } = require('./config');

const generateWallet = async () => {
  const mnemonic = Mnemonic.generate();
  const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
  const address = await keypair.getPublicKey().toSuiAddress();

  return { address, mnemonic };
};

const generateWallets = async (totalWallets) => {
  const wallets = [];

  for (let i = 0; i < totalWallets; i++) {
    const wallet = await generateWallet();
    wallets.push(wallet);
    console.log(`[${i + 1}/${totalWallets}] Created wallet: ${wallet.address}`);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const filePath = path.join(OUTPUT_DIR, OUTPUT_FILE);
  const data = wallets.map(w => `${w.address} | ${w.mnemonic}`).join('\n');
  fs.writeFileSync(filePath, data);

  console.log(`\n✅ Successfully generated ${totalWallets} SUI wallets.`);
  console.log(`📁 Saved to: ${filePath}`);
};

module.exports = { generateWallets };
