# EthLog

Ethereum Log that can be used as small chat service.

## Setup

Create wallet and receive ropsten ethereum.
Metamask is quick way to setup.
https://blog.bankex.org/how-to-buy-ethereum-using-metamask-ccea0703daec

Save your username and the mnemonic (or "wallet seed") shown while wallet setup as `.secret.json`.
The username is ascii only, up to 32 bytes.

```json
{
    "username": "tomy",
    "mnemonic": "apple banana cat bla bla bla"
}
```

Then, run reader.js. Past posts will be soon shown.

```sh
node reader.js
```

In order to speak something, run `sender.js` with STDIN.

```sh
node sender.js <<< "Hello ETH!"
```

Known Bug: This program does not halt. Kill with Ctrl-C.

Your speech will be shown in reader after about 30 seconds.
