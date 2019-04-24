var Web3 = require('web3');
var web3 = new Web3("ws://localhost:7545");

//simplestorageのABI
var abi = require('./build/contracts/EthLog.json');

//デプロイしたアドレス
var address = abi.networks['5777'].address;
const ethLog = new web3.eth.Contract(abi.abi, address, {});

ethLog.getPastEvents("allEvents", {fromBlock: 0}).then((events) => {
	console.log("past events");
	events.forEach(processEvent);
});

var event = ethLog.events.Speech();
event.on('data', (ev) => {
	processEvent(ev);
});
event.on('changed', (ev) => {
	console.log(ev);
});
event.on('error', (ev) => {
	console.error(ev);
});

async function processEvent(event) {
	const sender = event.returnValues[0];
	const body = event.returnValues[1];
	const nickname = await ethLog.methods.getNickname(sender).call();
	console.log(`${web3.utils.hexToUtf8(nickname)}: ${body}`);
}
