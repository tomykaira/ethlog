var Web3 = require('web3');
var web3 = new Web3("ws://localhost:7545");

//simplestorageのABI
var abi = require('./build/contracts/EthLog.json');

//デプロイしたアドレス
var address = '0x87Fd49F6356f508489eaddaF2A14fFb55593f2AD';
const ethLog = new web3.eth.Contract(abi.abi, abi.networks['5777'].address, {});

web3.eth.getAccounts().then((accounts) => {
	const input = require('fs').readFileSync('/dev/stdin', 'utf8');
	return say(accounts[0], "tomy", input);
});

async function say(address, nick, body) {
	const hex = web3.utils.asciiToHex(nick);
	const current = await ethLog.methods.getNickname(address).call();
	if (current != hex) {
		ethLog.methods.introduce(hex).send({ from: address })
	}
	ethLog.methods.say(body).send({ from: address });
}
