const settings = require(`${ROOT}/config`).requireEnv("./settings");
const request = require('request');

function ozysReport(url, body) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            json: true,
            body,
        }
        request(url, options, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res.body);
        })
    });
}

class Monitor {
    constructor () {
        this.validatorAddress;
        this.nodeConnect = {};
        this.blockNumber = {};
        this.ibc = {};

        for (const [key, value] of Object.entries(settings.VALIDATOR_MONITOR) ) {
            if (!value.Interval) {
                value.Interval = 10 * 1000;
            }
            setInterval(() => {
                this.reportMonitorStatus(key, value);
            }, value.Interval);
        }
    }

    static getChainFullName(chain) {
        chain = chain.toUpperCase();

        if(chain.substr(0, 2) === 'GOV' && chain !== 'GOV_OCHAIN')
            return null;

        let fullNames = {
            ETH: 'ethereum',
            KLAYTN: 'klaytn',
            TERRA: 'terra',
        };

        return fullNames[chain] || '';
    }

    reportMonitorStatus(method, data) {
        try {
            switch (method) {
                case "Ozys":
                    ozysReport(data.Endpoint, this.json());
                    break;
                default:
                    console.log(`unknown monitor method offered: ${method}`);
                    break;
            }
        } catch (e) {
            //console.log(e);
        }
    }

    setNodeConnectStatus (chain, address, connectionStatus) {
        if (!chain || !address) {
            return;
        }

        chain = Monitor.getChainFullName(chain);
        if (!chain) {
            return;
        }

        if (!this.nodeConnect[chain]) {
            this.nodeConnect[chain] = {};
        }
        this.nodeConnect[chain][address] = {connectionStatus};
    }

    setBlockNumber (chain, block) {
        if (!chain || !block)
            return;

        chain = Monitor.getChainFullName(chain);
        if(!chain)
            return;

        if (!this.blockNumber[chain])
            this.blockNumber[chain] = {}

        this.blockNumber[chain] = block
    }

    setProgress(chain, func, block) {
        if (!chain || !func || !block)
            return;

        chain = Monitor.getChainFullName(chain);
        if(!chain)
            return;

        if (!this.ibc[chain])
            this.ibc[chain] = {}

        this.ibc[chain][func] = block
    }

    json () {
        return {
            validatorAddress: this.validatorAddress,
            nodeConnection: this.nodeConnect,
            orbitBlockNumber: this.blockNumber,
            ibc: this.ibc,
        }
    }
}

module.exports = Monitor;