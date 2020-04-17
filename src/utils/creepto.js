const crypto = require("crypto");
const aes= require("aes-js")

let hashFileWithSalt256 = (buffer,salt) => {
  if(typeof salt === 'undefined') {
    salt = crypto.randomBytes(16)
  }
  let hash = crypto.createHash("sha256");
  let hashDigest = hash.update(Buffer.concat([buffer,salt])).digest('hex')
  return {hashDigest,salt}
};

let verifyHashFileWithSalt256 = (hash, salt, buffer) => {
  let hashDigest = crypto.createHash("sha256").update(Buffer.concat(
    [buffer,salt])).digest("hex")
  return hash === hashDigest
}

let keyString256 = (password, salt) => {
  if(typeof salt === 'undefined') {
    salt = crypto.randomBytes(16)
  }
  let key = crypto.createHash("sha256").update(password).digest()
  return {key, salt}
}

let aesEncrypt = (key,value) => {
  try{
    let valueBytes = aes.utils.utf8.toBytes(value)
    let aesCtr = new aes.ModeOfOperation.ctr(key, new aes.Counter(5));
    let encryptedBytes = aesCtr.encrypt(valueBytes)
    return aes.utils.hex.fromBytes(encryptedBytes)
  }
  catch(error) {
    console.error(error)
  }
}
let aesDecrypt = (givenKey , encryptedHex) => {
  let encryptedBytes = aes.utils.hex.toBytes(encryptedHex);
  try {
    let aesCtr = new aes.ModeOfOperation.ctr(givenKey, new aes.Counter(5));
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);

    return aes.utils.utf8.fromBytes(decryptedBytes);
  }
  catch(error) {
    console.error(error)
  }
}

module.exports = {hashFileWithSalt256,verifyHashFileWithSalt256,keyString256, aesEncrypt, aesDecrypt}
