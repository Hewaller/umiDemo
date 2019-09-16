import request from '../../../utils/request';

export function getNodeList(params) {
  return request.post(`/node/list`, params);
}
export function getDictList(params) {
  return request.get('/dict/list', params);
}
export function getNodeStatistics(params) {
  return request.get('/node/getNodeStatistics');
}
export function getUpdateTimeStamp(params) {
  return request.get('/node/getUpdateTimeStamp');
}
export function queryPageVoteDetailList(params) {
  return request.post('/node/queryPageVoteDetailList', params);
}
export function getVoteRounds(params) {
  return request.get('/node/voteRounds', params);
}
export function getVoteResults(params) {
  return request.post('/node/queryPageCampaignPeriodVoteResult', params);
}
// 获取节点投票进行中列表
export function geVoteOngoing(params) {
  return request.post('/node/queryLastVoteResult', params);
}
