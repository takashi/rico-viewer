import { abi } from './daico_pod_abi';
import { promisify } from './promisify';

export default class DaicoPoDContract {
  constructor(web3, contractAddress) {
    this.web3 = web3;
    this.contractAddress = contractAddress;
    this.cachedContract = null;
  }

  async tap() {
    let contract = await this.getCachedContract();
    return promisify(contract.tap)();
  }

  getCachedContract() {
    if (this.cachedContract) {
      return this.cachedContract;
    } else {
      return this.contract();
    }
  }

  contract() {
    let contract = this.web3.eth.contract(abi)
    return promisify(contract.at, contract)(this.contractAddress);
  }
}
