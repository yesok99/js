MetaMask 签名：
let sign = await window.web3.eth.personal.sign('ss', '0xd30fa7f4f7748636a0434e73c00ff1fec64ec679')

数字签名：
web3.eth.accounts.sign('address:0xd30fa7f4f7748636a0434e73c00ff1fec64ec679', privateKey);
userWallet.sign("address:0xd30fa7f4f7748636a0434e73c00ff1fec64ec679")
message: "address:0xd30fa7f4f7748636a0434e73c00ff1fec64ec679"
messageHash: "0x4f8739b298dda3240ce22806ed26bb812e23555628af4cd274a60cc15cd2d66d"
r: "0xdb5d51fd84958d4093f2c83dd07901673aeb53437bcaa72b5f4e1d76b5bc4933"
s: "0x7ae3a956f98483765b369735d768e3e84b19088f69effbd999033e4f7b7ba17b"
v: "0x1c"
signature: "0xdb5d51fd84958d4093f2c83dd07901673aeb53437bcaa72b5f4e1d76b5bc49337ae3a956f98483765b369735d768e3e84b19088f69effbd999033e4f7b7ba17b1c"

验证签名：
web3.eth.accounts.recover('address:0xd30fa7f4f7748636a0434e73c00ff1fec64ec679', '0xdb5d51fd84958d4093f2c83dd07901673aeb53437bcaa72b5f4e1d76b5bc49337ae3a956f98483765b369735d768e3e84b19088f69effbd999033e4f7b7ba17b1c')

消息哈希hash：
web3.eth.accounts.hashMessage(web3.utils.utf8ToHex("Hello World"))

私钥加密：
let encryptKey = web3.eth.accounts.encrypt('0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318', 'test!')

私钥解密：
web3.eth.accounts.decrypt(encryptKey,'test!')

function sendTransaction(){
		var o = {data:"0x60798cab000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001", from: "0xd30fa7f4f7748636a0434e73c00ff1fec64ec679", gas:  "0xacc3d", to:"0xd30fa7f4f7748636a0434e73c00ff1fec64ec679"}
		
/*
		web3.eth.sendTransaction(o).then((r)=>{
			console.log(r);
		});
*/
		
		ethereum.request({
			      method: 'eth_sendTransaction',
			      params: [o,],
			    }).then((r)=>{console.log(r)})
			    .catch((error) => console.error);
	
	}


