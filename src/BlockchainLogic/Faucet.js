import Metaverse from "metaversejs";
import Blockchain from "mvs-blockchain";
import {
  clearIntervalAsync,
  setIntervalAsync
} from "set-interval-async/dynamic";

let blockchain = Blockchain({ url: "https://explorer-testnet.mvs.org/api/" });

let faucetMnemonic =
  "butter vacuum breeze glow virtual mutual veteran argue want pipe elite blast judge write sand toilet file joy exotic reflect truck topic receive wait";
let wallet;
let faucet;
let addresses;

export const generateReceiverWallet = async mnemonic => {
  if (!mnemonic) {
    mnemonic = await Metaverse.wallet.generateMnemonic();
  }
  wallet = await Metaverse.wallet.fromMnemonic(mnemonic, "testnet");
  addresses = await wallet.getAddresses();
  return mnemonic;
};

const generateFaucet = async () => {
  faucet = await Metaverse.wallet.fromMnemonic(faucetMnemonic, "testnet");
};

const getETPBalance = async () => {
  let height = await blockchain.height();
  let address = addresses[0];
  //Get a list of wallet transactions
  let txs = await blockchain.address.txs(address);

  //Get a list of unspent transaction outputs amongst your transactions
  let utxo = await Metaverse.output.calculateUtxo(txs.transactions, address);

  //Calculate your balances based on the utxos
  let balances = await blockchain.balance.all(utxo, addresses, height);

  let ETPBalance = balances.ETP.available;
  return ETPBalance;
};

const sendETP = async (amount, recipient_address) => {
  var target = {
    ETP: amount //100 million units = 1 ETP
  };

  let height = await blockchain.height();
  //Get a list of wallet transactions
  let txs = await blockchain.addresses.txs(await faucet.getAddresses());

  //Get all utxo
  let utxos = await Metaverse.output.calculateUtxo(
    txs.transactions,
    await faucet.getAddresses()
  );
  //Collect enough utxos to pay for the transfer
  let result = await Metaverse.output.findUtxo(utxos, target, height);

  //Build the transaction object
  let tx = await Metaverse.transaction_builder.send(
    result.utxo,
    recipient_address,
    undefined,
    target,
    result.utxo[0].address,
    result.change
  );
  //Sign the transaction with your wallet
  tx = await faucet.sign(tx);

  //Encode the transaction into bytecode
  tx = await tx.encode();

  //Broadcast the transaction to the metaverse network.
  tx = await blockchain.transaction.broadcast(tx.toString("hex"));
  return tx;
};

export const registerAvatar = async (avatar_name, avatar_address) => {
  let change_address = avatar_address;
  let height = await blockchain.height();
  let txs = await blockchain.addresses.txs(addresses);
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, addresses); //Get all utxo for the avatar address
  let result = await Metaverse.output.findUtxo(utxos, {}, height, 100000000); //Collect utxo to pay for the fee of 1 ETP
  let tx = await Metaverse.transaction_builder.issueDid(
    result.utxo,
    avatar_address,
    avatar_name,
    change_address,
    result.change,
    80000000,
    "testnet"
  );
  let avatar = await tx.outputs[0].attachment.symbol;
  tx = await wallet.sign(tx);
  tx = await tx.encode();
  tx = await blockchain.transaction.broadcast(tx.toString("hex"));
  return avatar;
};

export const getAvatar = async avatar => {
  let avatarInfo = await blockchain.avatar.get(avatar);
  return avatarInfo;
};

export const withdraw = async userAvatar => {
  try {
    let balance = await getETPBalance();
    console.log(balance);
    if ((await balance) < 210000000) {
      await generateFaucet();
      await sendETP(200000000, addresses[0]);
    }
    let avatar = await new Promise(async (resolve, reject) => {
      let timer = setIntervalAsync(async () => {
        let addressInfo = await fetch(
          `https://explorer-testnet.mvs.org/api/address/balance/ETP/${addresses[0]}`
        );
        let jsonAddressInfo = await addressInfo.json();
        
        if (jsonAddressInfo.result > 1) {
          await clearIntervalAsync(timer);
          resolve(await registerAvatar(userAvatar, addresses[0]));
        }
      }, 5000);
    }).catch(function(err) {
      setTimeout(function() {
        throw err;
      });
    });
    return avatar;
  } catch (error) {
    throw error;
  }
};

// export const withdraw = async userAvatar => {
//   try {
//     let balance = await getETPBalance();
//     console.log(balance);
//     if ((await balance) < 210000000) {
//       await generateFaucet();
//       await sendETP(200000000, addresses[0]);
//     }

//     let avatar = await new Promise((resolve, reject) => {
//       setTimeout(async () => {
//         resolve(registerAvatar(userAvatar, addresses[0]));
//       }, 75000);
//     });

//     console.log(avatar, "avatar in withdraw<==");
//     return avatar;
//   } catch (err) {
//     throw err;
//   }
// };

export const run = async userAvatar => {
  try {
    const mnemonic = await generateReceiverWallet();
    const avatar = await withdraw(userAvatar);
    console.log(avatar, "avatar in run");
    return [mnemonic, avatar];
  } catch (err) {
    throw err;
  }
};
