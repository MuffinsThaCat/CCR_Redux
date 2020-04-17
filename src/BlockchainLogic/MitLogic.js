import Metaverse from "metaversejs";
import Blockchain from "mvs-blockchain";

let blockchain = Blockchain({
  url: "https://explorer-testnet.mvs.org/api/"
});

//create new MIT
export async function issueMIT(wallet, content, symbolHash) {
  let addresses = await wallet.getAddresses();

  /*issuer avatar -> recipient address & change_address are the same.*/
  let avatar = await blockchain.avatar.get(addresses[0]);

  let height = await blockchain.height();
  let txs = await blockchain.addresses.txs(wallet.getAddresses());
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [
    addresses[0]
  ]); //Get all utxo
  let result = await Metaverse.output.findUtxo(utxos, {}, height, 10000); //Collect utxo to pay fee of 0.0001 ETP
  let tx = await Metaverse.transaction_builder.registerMIT(
    result.utxo,
    addresses[0],
    avatar.symbol,
    symbolHash,
    content,
    addresses[0],
    result.change
  );
  tx = await wallet.sign(tx);
  tx = await tx.encode();
  tx = await blockchain.transaction.broadcast(tx.toString("hex"));
  // .then(tx=>tx.toString('hex'))
}
/*
//Transfer MIT To Selected avatar not address
async function sendMIT() {
  let MITIndex = MITSelect[MITSelect.selectedIndex].value;
  console.log(MITIndex, "MITIndex");

  let symbol = MITData[MITIndex].symbol;

  let recipient_avatar = document.getElementById("sendTo").value;

  let recipient_address = await getAvatar(recipient_avatar);

  let sender_avatar = MITData[MITIndex].owner;
  let sender_address = await getAvatar(sender_avatar);
  let change_address = sender_address;

  console.log(recipient_address, "recipient_address");
  console.log(symbol, "symbol");
  console.log(sender_address, "sender_address");
  let height = await blockchain.height();
  let txs = await blockchain.addresses.txs(addresses);
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [
    sender_address
  ]); //Get all utxo
  //console.log(utxos)

  let results = await Promise.all([
    Metaverse.output.findUtxo(utxos, {}, height),
    Metaverse.output.filter(utxos, {
      symbol: symbol
    })
  ]);

  let tx = await Metaverse.transaction_builder.transferMIT(
    results[0].utxo.concat(results[1]),
    sender_avatar,
    recipient_address,
    recipient_avatar,
    symbol,
    change_address,
    results[0].change
  );
  tx = await wallet.sign(tx);

  tx = await tx.encode();

  tx = await blockchain.transaction.broadcast(tx.toString("hex"));

  console.log(tx, "tx"); //<- just the hash
}
*/
export const getMits = async addressArray => {
  //Get the lastest Blockchain Length
  let height = await blockchain.height();

  //Get a list of wallet transactions
  let txs = await blockchain.addresses.txs(addressArray);

  //Get a list of unspent transaction outputs amongst your transactions
  let utxo = await Metaverse.output.calculateUtxo(
    txs.transactions,
    addressArray[0]
  );

  //Calculate your balances based on the utxos
  let balances = await blockchain.balance.all(utxo, addressArray[0], height);
  return balances.MIT.map(mit => mit, "balances");
};
