# EthLog

Ethereum Log that can be used as small chat service.

## Setup

Create wallet and receive ropsten ethereum.
Metamask is quick way to setup.
https://blog.bankex.org/how-to-buy-ethereum-using-metamask-ccea0703daec

Save the mnemonic shown while wallet setup as `.secret`.

Open sender.js and change `tomy` to your name.
Name is ascii only, up to 32 bytes.

```
- return say(web3.eth.defaultAccount, "tomy", input);
+ return say(web3.eth.defaultAccount, "<yourname>", input);
```

Then, run reader.js. Past posts will be soon shown.


```
node reader.js
```

In order to speak something, run `sender.js` with STDIN.

```
node sender.js <<< "Hello ETH!"
```

Known Bug: This program does not halt. Kill with Ctrl-C.

Your speech will be shown in reader after about 30 seconds.
