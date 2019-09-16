import request from '../utils/request';

export function fetchTps() {
  return request.post(`/block/getMaxTps`);
}

export function getLinchpinQuotas() {
  return request.post(`/block/getLinchpinQuotas`);
}

export function getNewEchartData() {
  return request.post(`/price/getNewEchartData`);
}

export function feedback(params) {
  return request.post(`/feedback`, params);
}

export function checkoutAddress(address) {
  return request.post(`/addrs/checkErcContractAddress/${address}`);
}
export function queryerc20TokenList(address) {
  return request.post(`/tx-transfer/erc-contract/erc20TokenList/${address}`);
}
