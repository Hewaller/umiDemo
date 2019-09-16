import React, { Component } from 'react';
import { connect } from 'dva';
import Header from '../../components/Header';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Nodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetWidth: null,
      page: 1,
      pageSize: 20,
      nodeType: '',
      country: '',
      current: '1',
      voteRound: null,
    };
  }
  changeTab = key => {
    const { country, nodeType, pageSize, voteRound } = this.state;
    if (key === '2') {
      this.props
        .dispatch({
          type: 'nodes/getVoteRounds',
        })
        .then(() => {
          const { rounds } = this.props;
          if (rounds) {
            this.props
              .dispatch({
                type: 'nodes/getVoteResults',
                payload: {
                  currentPage: 1,
                  pageSize,
                  voteRound: voteRound || rounds.length, // 初始化默认取最新一期竞选结果
                },
              })
              .then(() => {
                this.setState({
                  current: key,
                  page: 1,
                });
              });
          }
        });
    } else if (key === '1') {
      this.props
        .dispatch({
          type: 'nodes/getList',
          payload: {
            currentPage: 1,
            pageSize,
            country,
            nodeType,
          },
        })
        .then(() => {
          this.setState({
            current: key,
            page: 1,
          });
        });
    } else if (key === '3') {
      this.props
        .dispatch({
          type: 'nodes/geVoteOngoing',
          payload: {
            currentPage: 1,
            pageSize,
          },
        })
        .then(() => {
          this.setState({
            current: key,
            page: 1,
          });
        });
    }
  };
  render() {
    let { page, pageSize, current } = this.state;
    let { list } = this.props;
    let nodeList = [];
    if (list && list.list) {
      nodeList = list.list;
      nodeList.map((item, index) => (item['key'] = (page - 1) * pageSize + index + 1));
    }
    return (
      <div id="HPB-nodes-page">
        <Header selectedKey="nodes"></Header>
        <div className="container base-card ">
          <div className="nodes-card">
            <Tabs activeKey={current} className="tx-static-tabs" onChange={this.changeTab}>
              <TabPane tab={'11'} key="1"></TabPane>
              {/* 往期节点竞选结果  */}
              <TabPane tab={'222'} key="2"></TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loading: state.loading.models.nodes,
    list: state.nodes.list,
    dict: state.nodes.dict,
    info: state.nodes.info,
    updateTime: state.nodes.updateTime,
    rounds: state.nodes.rounds,
    ongoingList: state.nodes.ongoingList,
  };
}
export default connect(mapStateToProps)(Nodes);
