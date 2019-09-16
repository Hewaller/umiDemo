import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import styles from './index.less';
import { connect } from 'dva';
import router from 'umi/router';
import { Menu, Collapse, message } from 'antd';

import { setLocale, getLocale } from 'umi/locale';

import { feedback } from '../../services/index';
const Panel = Collapse.Panel;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      current: '',
      open: false,
      visible: false,
      offsetWidth: null,
      visibleAdvice: false,
    };
  }
  handleClick = e => {
    this.setState({ current: e.key });
  };
  handleSearch = v => {
    let search = v.trim();
    if (search.length === 42) {
      this.props
        .dispatch({
          type: 'global/checkoutAddress',
          address: search,
        })
        .then(() => {
          const { contractType = '' } = this.props;
          if (contractType === 'ERC20') {
            router.push({ pathname: `/HRC20Contract/${search}` });
          } else {
            router.push({ pathname: `/address/${search}` });
          }
        });
      // router.push({ pathname: `/address/${search}` });
    } else if (search.length === 66) {
      router.push({ pathname: `/tx/${search}` });
    } else if (search.length > 0) {
      let reg = new RegExp(/^\d{1,}$/);
      if (reg.test(search)) {
        router.push({ pathname: `/block/${search}` });
      } else {
        router.push({ pathname: '/searchError' });
      }
    }
  };
  handleSearchInput = e => {
    let value = e.target.value;
    let valueTrim = value.trim();
    this.setState({
      search: valueTrim,
    });
  };
  handleSearchSubmit = () => {
    this.setState({
      open: false,
    });
    let { search } = this.state;
    search = search.trim();
    if (search.length === 42) {
      router.push({ pathname: `/address/${search}` });
    } else if (search.length === 66) {
      router.push({ pathname: `/tx/${search}` });
    } else if (search.length > 0) {
      let reg = new RegExp(/^\d{1,}$/);
      if (reg.test(search)) {
        router.push({ pathname: `/block/${search}` });
      } else {
        router.push({ pathname: '/searchError' });
      }
    }
  };
  //打开移动端菜单
  showMobileMenu = () => {
    this.setState({
      open: true,
    });
  };
  //关闭移动端菜单
  closeMobileMenu = () => {
    this.setState({
      open: false,
    });
  };
  //指标解释
  setModalVisible = v => {
    this.setState({
      visible: v,
    });
  };
  //意见反馈
  setAdviceVisible = v => {
    this.setState({
      visibleAdvice: v,
    });
  };
  //设置网站语言
  setLanguage = l => {
    setLocale(l);
  };
  //反馈表单提交
  handleSubmit = e => {
    e.preventDefault();
    let me = this;
    me.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.conn && values.advice) {
          feedback(values).then(res => {
            if (res && res[0] === '000000') {
              message.success('sucess', 2);
              me.setState({
                visibleAdvice: false,
              });
            } else {
              message.eror('error', 2);
            }
          });
        }
      }
    });
  };

  screenChange = () => {
    let offsetWidth = document.body.offsetWidth;
    this.setState({ offsetWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.screenChange);
  }
  componentDidMount() {
    this.screenChange();
    window.addEventListener('resize', this.screenChange);
    let { selectedKey } = this.props;
    this.setState({ current: selectedKey });
  }
  render() {
    let { open } = this.state;

    let menuClassName = styles.mobileMenu;

    if (open) {
      menuClassName += ` ${styles.active}`;
    }
    return (
      <div className={styles.headerBlock}>
        <div id="component-header" className={styles.header}>
          {/* 移动端导航栏 */}
          <div id="header-mobile-menu" className={menuClassName}>
            <div className={styles.componentHeaderMobile}>
              <Link className={styles.logoContainer} to="/">
                <i className="hpb-logo"></i>
              </Link>
              <div className={styles.headerMobileMenu}>
                <i onClick={this.closeMobileMenu} className={styles.headerMenuIconClose}></i>
              </div>
            </div>
            <div className={styles.mobileSearch}>
              <input onChange={e => this.handleSearchInput(e)} type="text" placeholder={'search'} />
              <i onClick={this.handleSearchSubmit} className={styles.mobileSearchIcon}></i>
            </div>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]}>
              <Menu.Item key="index" onClick={this.closeMobileMenu}>
                <Link to="/">
                  {/* <FormattedMessage id="HEAD_HOME" /> */}
                  'index'
                </Link>
              </Menu.Item>
              <Menu.Item key="nodes" onClick={this.closeMobileMenu}>
                <Link to="/nodes">
                  {/* <FormattedMessage id="HEAD_NODES" /> */}
                  nodes
                </Link>
              </Menu.Item>
            </Menu>
            <Collapse defaultActiveKey={['1']} expandIconPosition="right">
              <Panel header={'lang'} key="1">
                <div className={styles.mobileMenuLanguage}>
                  <p
                    className={getLocale() === 'zh-CN' ? styles.mobileMenuActive : ''}
                    onClick={() => this.setLanguage('zh-CN')}
                  >
                    中文
                  </p>
                  <p
                    className={getLocale() !== 'zh-CN' ? styles.mobileMenuActive : ''}
                    onClick={() => this.setLanguage('en-US')}
                  >
                    English
                  </p>
                </div>
              </Panel>
            </Collapse>
            <p onClick={() => this.setAdviceVisible(true)} className={styles.mobileMenuQA}>
              {/* <FormattedMessage id="HEAD_FEEDBACK" /> */}
              FEEDBACK
            </p>
            <p onClick={() => this.setModalVisible(true)} className={styles.mobileMenuQA}>
              {/* <FormattedMessage id="HEAD_INDICATORS" /> */}
              INDICATORS
            </p>
          </div>
          {/* PC 导航栏 */}
          <div className="container">
            <div className={styles.componentHeaderPC}>
              <Link className={styles.logoContainer} to="/">
                <i className="hpb-logo"></i>
              </Link>
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className={styles.headerMenu}
              >
                <Menu.Item key="index">
                  <Link to="/">
                    {/* <FormattedMessage id="HEAD_HOME" /> */}
                    index
                  </Link>
                </Menu.Item>
                <Menu.Item key="nodes">
                  <Link to="/nodes">
                    {/* <FormattedMessage id="HEAD_NODES" /> */}
                    nodes
                  </Link>
                </Menu.Item>
                {/* PC端导航栏 */}
              </Menu>{' '}
            </div>
            <div className={styles.componentHeaderMobile}>
              <Link className={styles.logoContainer} to="/">
                <i className="hpb-logo"></i>
              </Link>
              <div className={styles.headerMobileMenu}>
                <i onClick={this.showMobileMenu} className={styles.headerMenuIcon}></i>
              </div>
            </div>
          </div>{' '}
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  selectedKey: PropTypes.oneOf([
    'index',
    'nodes',
    'blocks',
    'txs',
    'account',
    'contract',
    'HRC20',
    'contractsVerified',
    'HRC721',
    'reward',
  ]),
};

function mapStateToProps(state) {
  return {
    contractType: state.global.contractType,
  };
}
export default connect(mapStateToProps)(Header);
