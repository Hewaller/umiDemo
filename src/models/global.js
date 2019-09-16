import * as globalService from '../services';
export default {
  namespace: 'global',
  state: {
    tps: null,
    quotas: null,
    chartData: null,
    contractType: null,
    E20List: null,
    E20FlterList: null,
    TokenLength: null,
  },
  reducers: {
    saveMaxTps(state, { payload: tps }) {
      return {
        ...state,
        tps: tps[2],
      };
    },
    saveLinchpinQuotas(state, { payload: data }) {
      return {
        ...state,
        quotas: data[2],
      };
    },
    saveEchartData(state, { payload: data }) {
      return {
        ...state,
        chartData: data[2],
      };
    },
    saveContractType(state, { payload: data }) {
      const { contractType = '' } = data[2];
      return {
        ...state,
        contractType,
      };
    },
    set20TokenList(state, { payload: data }) {
      const List = data[2];
      const filterBlank = List.filter(
        item => item.contractType === 'ERC721' || item.contractType === 'ERC20'
      );
      const groupBy = (arr, fn) =>
        arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
          acc[val] = (acc[val] || []).concat(arr[i]);
          return acc;
        }, {});
      const newData = groupBy(filterBlank, item => item.contractType);
      const length = filterBlank.length;
      return {
        ...state,
        E20List: filterBlank,
        E20FlterList: newData,
        TokenLength: length,
      };
    },
    fileter(state, { payload }) {
      const { E20List } = state;
      const groupBy = (arr, fn) =>
        arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
          acc[val] = (acc[val] || []).concat(arr[i]);
          return acc;
        }, {});
      let newE20 = '';
      if (!payload.length) {
        // 输入内容为空显示所有数据
        newE20 = groupBy(E20List, item => item.contractType);
      } else {
        const filerData = E20List.filter(item =>
          item.tokenName.toLocaleLowerCase().includes(payload.toLocaleLowerCase())
        );
        newE20 = groupBy(filerData, item => item.contractType);
      }
      return {
        ...state,
        E20FlterList: newE20,
      };
    },
  },
  effects: {
    *getMaxTps(action, { call, put }) {
      const data = yield call(globalService.fetchTps);
      yield put({ type: 'saveMaxTps', payload: data });
    },
    *getLinchpinQuotas(action, { call, put }) {
      const data = yield call(globalService.getLinchpinQuotas);
      yield put({ type: 'saveLinchpinQuotas', payload: data });
    },
    *getEchartData(action, { call, put }) {
      const data = yield call(globalService.getNewEchartData);
      yield put({ type: 'saveEchartData', payload: data });
    },
    *checkoutAddress({ address = '' }, { call, put }) {
      const data = yield call(globalService.checkoutAddress, address);
      yield put({ type: 'saveContractType', payload: data });
    },
    *queryerc20TokenList({ payload: param }, { call, put }) {
      const data = yield call(globalService.queryerc20TokenList, param);
      yield put({ type: 'set20TokenList', payload: data });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'getMaxTps' });
          dispatch({ type: 'getLinchpinQuotas' });
          dispatch({ type: 'getEchartData' });
        }
      });
    },
  },
};
