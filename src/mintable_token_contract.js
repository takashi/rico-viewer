import { MintableTokenABI } from './mintable_token_abi'
import { promisify } from './promisify';

export default class MintableTokenContract {
  constructor(web3, contractAddress) {
    this.web3 = web3;
    this.contractAddress = contractAddress;
    this.cachedToken = null;
  }

  async getTokenBasicInfo() {
    let token = await this.getCachedToken();

    return Promise.all(
      [
        promisify(token.name)(),
        promisify(token.symbol)(),
        promisify(token.decimals)(),
        promisify(token.projectOwner)()
      ]
    )
  }

  async getTotalSupply() {
    let token = await this.getCachedToken();
    return promisify(token.totalSupply)();
  }

  async transfer(to, amount) {
    let token = await this.getCachedToken();
    return promisify(token.transfer)(to, amount);
  }

  async getBalanceOf(address) {
    let token = await this.getCachedToken();
    return promisify(token.balanceOf)(address);
  }

  async getDecimals() {
    let token = await this.getCachedToken();
    return promisify(token.decimals)();
  }

  getCachedToken() {
    if (this.cachedToken) {
      return this.cachedToken;
    } else {
      return this.token();
    }
  }

  token() {
    let contract = this.web3.eth.contract(MintableTokenABI)

    // The Ishikawa Coin contract
    return promisify(contract.at, contract)(this.contractAddress);
  }
}
