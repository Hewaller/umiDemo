import * as nodeService from '../services/nodes';
export default {
  namespace: 'nodes',
  state: {
    list: null,
    dict: [],
    info: null,
    updateTime: null,
    blockTx: null,
    rounds: null,
  },
  reducers: {
    saveList(state, { payload: data }) {
      return {
        ...state,
        list: data[2],
      };
    },
    saveDict(state, { payload: data }) {
      return {
        ...state,
        dict: data[2],
      };
    },
    saveUpdateTime(state, { payload: data }) {
      return {
        ...state,
        updateTime: data[2],
      };
    },
    setNodeStatistics(state, { payload: data }) {
      return {
        ...state,
        info: data[2],
      };
    },
    saveVotelist(state, { payload: data }) {
      return {
        ...state,
        blockTx: data[2],
      };
    },
    saveVoteRounds(state, { payload: data }) {
      return {
        ...state,
        rounds: data[2],
      };
    },
    saveVoteResults(state, { payload: data }) {
      return {
        ...state,
        list: data[2],
      };
    },
    saveVoteOngoing(state, { payload: data }) {
      return {
        ...state,
        list: data[2],
      };
    },
  },
  effects: {
    *getList({ payload: params }, { call, put }) {
      const data = yield call(nodeService.getNodeList, params);
      yield put({ type: 'saveList', payload: data });
    },
    *getDictList({ payload: params }, { call, put }) {
      const data = yield call(nodeService.getDictList, params);
      yield put({ type: 'saveDict', payload: data });
    },
    *getNodeStatistics(action, { call, put }) {
      const data = yield call(nodeService.getNodeStatistics);
      yield put({ type: 'setNodeStatistics', payload: data });
    },
    *getUpdateTimeStamp(action, { call, put }) {
      const data = yield call(nodeService.getUpdateTimeStamp);
      yield put({ type: 'saveUpdateTime', payload: data });
    },
    *getPageVoteDetailList({ payload: params }, { call, put }) {
      const data = yield call(nodeService.queryPageVoteDetailList, params);
      yield put({ type: 'saveVotelist', payload: data });
    },
    *getVoteRounds({ payload: params }, { call, put }) {
      const data = yield call(nodeService.getVoteRounds, params);
      yield put({ type: 'saveVoteRounds', payload: data });
    },
    *getVoteResults({ payload: params }, { call, put }) {
      const data = yield call(nodeService.getVoteResults, params);
      yield put({ type: 'saveVoteResults', payload: data });
    },
    // 获取节点投票进行中列表
    *geVoteOngoing({ payload: params }, { call, put }) {
      const data = yield call(nodeService.geVoteOngoing, params);
      yield put({ type: 'saveVoteOngoing', payload: data });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/nodes') {
          dispatch({
            type: 'getList',
            payload: {
              currentPage: 1,
              pageSize: 20,
              nodeType: '',
              country: '',
            },
          });
          dispatch({
            type: 'getDictList',
            payload: {
              groupName: 'nationality',
            },
          });
          dispatch({ type: 'getNodeStatistics' });
          dispatch({ type: 'getUpdateTimeStamp' });
        } else if (pathname === '/vote') {
          if (query) {
            let params = {
              candidateAddress: query.address,
              currentPage: 1,
              pageSize: 20,
              voteRound: query.round,
              voteStage: query.stage,
            };
            dispatch({ type: 'getPageVoteDetailList', payload: params });
          }
        }
      });
    },
  },
};
