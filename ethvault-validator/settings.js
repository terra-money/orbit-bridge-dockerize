module.exports = {
    // operating chain list
    chainList: [
        'eth',
        'klaytn',
        'icon',
    ],

    // Bridge Addresses
    BridgeAddress: {
        OrbitHubContract: "0xb5680a55d627c52de992e3ea52a86f19da475399",
        OrbitBridgeHubContract: "0xb5680a55d627c52de992e3ea52a86f19da475399",
        EthBridgeContract: "0x78d80c33f23a3395c52b3a8c0d0b12253771b9f7",
        KlaytnBridgeContract: "0x1af95905bb0042803f90e36d79d13aea6cd58969",
        MessageMultiSigWallet: {
            Hub: "0xfffec9385a40a12f8526fefc0036b6fc44b68092",
            Eth: "0xfffec9385a40a12f8526fefc0036b6fc44b68092",
            Klaytn: "0xfffec9385a40a12f8526fefc0036b6fc44b68092",
        },
        Eth: {
            EthVaultContract: "0x1bf68a9d1eaee7826b3593c20a0ca93293cb489a",
        },
        Klay: {
            KlaytnMinterContract: "0x60070F5D2e1C1001400A04F152E7ABD43410F7B9",
            MessageMultiSigWallet: "0x7eAF19361f709A1e4456da6A6DAA044821Af8B37",
        },
        Governance: {
            Chain: "ETH",
            Address: "0x1bf68a9d1eaee7826b3593c20a0ca93293cb489a",
            Bytes: "0x1bf68a9d1eaee7826b3593c20a0ca93293cb489a",
            Id: "0x50f408f4b0fb17bf4f5143de4bd95802410d00422f008e9deef06fb101a0f060",
        },
    },

    // Node Endpoints
    Endpoints: {
        Orbit: {
            rpc: "https://bridge-en.orbitchain.io:7443",
            socket: "wss://bridge-en.orbitchain.io:7444",
        },
        Eth: {
            rpc: process.env.ETH_RPC,
            socket: process.env.ETH_SOCKET,
        },
        Klaytn: {
            isKas: true,
            rpc: "",
            socket: "",
            Kas: {
                // KAS Default
                rpc: "https://node-api.klaytnapi.com/v1/klaytn",
                chainId: 8217,

                // Your Credential
                accessKeyId: process.env.KAS_KEY_ID,
                secretAccessKey: process.env.KAS_ACCESS_KEY
            }
        },
    },

    DEBUG: true,
    LOGLEVEL: 'debug',

    // WIP: validator things.
    VALIDATOR_ACCOUNT: {
        TYPE: "PK",
        DATA: process.env.PK,
    },

    VALIDATOR_MONITOR: {
        Ozys: {
            Endpoint: process.env.REPORT_URL,
            Interval: 60 * 1000,
        },
    },
}
