import net from 'net'
import ElectrumClient from 'electrum-client'
import bitcoin from 'bitcoinjs-lib'
import reverse from 'buffer-reverse'

const client = new ElectrumClient(net, false, 50001, 'electrumx02.firo.org', 'tcp')
const ver = await client.initElectrum({ client: 'firo', version: '1.4' })

// if (ver) console.log('connected')

const script = bitcoin.address.toOutputScript('a6r15E8Q9gqgWZSLLxZRQs4CWNkaaP5Y5b', {
  messagePrefix: '\x19Firo Signed Message:\n',
  bech32: 'firo',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x52,
  scriptHash: 0x7,
  wif: 0xd2,
})
const hash = bitcoin.crypto.sha256(script)

const reversedHash = Buffer.from(reverse(hash))
const balance = await client.blockchainScripthash_getBalance(reversedHash.toString('hex'))

console.log('余额：', (balance.confirmed / 100000000).toFixed(8) + ' FIRO')
