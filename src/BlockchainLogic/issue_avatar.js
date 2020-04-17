const createAvatar = () => {
  createAvatarLogic();
};

const createAvatarLogic = async () => {
  avatarName = document.getElementById("avatarName").value;
  Metaverse.transaction_builder
    .issueDid(
      utxo,
      avatar_address, //newUserAddress var
      symbol, //'username'
      change_address, //faucet address
      change,
      bounty_fee,
      network //'testnet'
    )
    .then(tx => wallet.sign(tx))
    .then(stx => {
      //Encode (serialize) the transaction
      return stx.encode();
    })
    .then(raw_tx => {
      console.log("Encoded transaction: " + raw_tx.toString("hex"));
    });
};
