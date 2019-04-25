var Web3 = require('web3');

const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const provider = new HDWalletProvider(mnemonic, '');

let privateKey = '';
let account = '';
for (key in provider.wallets) {
	const wallet = provider.wallets[key];
	account = key;
	privateKey = wallet._privKey;
}

var web3 = new Web3("wss://ropsten.infura.io/ws");
web3.eth.defaultAccount = account;
web3.eth.accounts.wallet.add('0x' + privateKey.toString('hex'));

var abi = require('./build/contracts/EthLog.json');
const ethLog = new web3.eth.Contract(abi.abi, abi.networks['3'].address);

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
return say(web3.eth.defaultAccount, "tomy", input);

async function say(address, nick, body) {
	const hex = web3.utils.asciiToHex(nick);
	const current = await ethLog.methods.getNickname(address).call();
	if (current != hex) {
		ethLog.methods.introduce(hex).send({ from: address, gasLimit: "47000" })
	}
	ethLog.methods.say(body).send({ from: address, gasLimit: "47000" }, (err) => {
		if (err) {
			console.warn(err);
		} else {
			console.log("OK");
		}
		process.exit();
	});
}
