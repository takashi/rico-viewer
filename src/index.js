import 'babel-polyfill';
import DaicoPoDContract from './daico_pod_contract';
import MintableTokenContract from './mintable_token_contract';
import { stringifyBalance } from './utils';

// export init funciton to window object.
const init = async () => {
  let web3js = undefined;
  if (typeof web3 !== undefined) {
    // Browser installs Metamask or Mist
    // Global web3.currentProvider object will be removed both Metamask and Mist.
    // https://github.com/ethereum/mist/releases/tag/v0.9.0
    // https://github.com/MetaMask/faq/blob/master/detecting_metamask.md#deprecation-of-global-web3js
    web3js = new Web3(web3.currentProvider);

    let daico = new DaicoPoDContract(web3js, '0xf7D2AB696743BE7F98bc6912c21Eb7813dD30ACB')
    let token = new MintableTokenContract(web3js, '0x79e4A5B105A2049FA0eb73e51093eD356Ace6a1a')

    let tap = await daico.tap();
    let [name, symbol, decimals, projectOwner] = await token.getTokenBasicInfo();
    let totalSupply = await token.getTotalSupply()

    console.log(stringifyBalance(tap, decimals), symbol, stringifyBalance(totalSupply, decimals))
  }
}

init();
