// 代币相关table的配置
// import router from 'umi/router';
import Link from 'umi/link';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { formatTimestamp, subStrFormatter, numberFormat } from './tools';
import { Icon } from 'antd';
import { MyImage } from '@/components';
// import numeral from 'numeral';

// 内部交易
export function InternalTransaction(address) {
  return [
    {
      title: formatMessage({ id: 'TABLE_NO' }),
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 60,
    },
    {
      title: formatMessage({ id: 'FatherBlock' }),
      dataIndex: 'txHash',
      key: 'txHash',
      render: text => (
        <Link className="detailValueHref" title={text} to={`/tx/${text}`}>
          {subStrFormatter(text)}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'HEAD_BLOCKS' }),
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      render: text => (
        <Link className="detailValueHref" title={text} to={`/block/${text}`}>
          {text}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'BLOCK_TABLE_TIME' }),
      dataIndex: 'blockTimestamp',
      key: 'blockTimestamp',
      render: text => <span>{formatTimestamp(text)}</span>,
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_SENT' }),
      dataIndex: 'fromAddress',
      key: 'fromAddress',
      render: (text, record) => {
        return address !== text ? (
          <Link className="detailValueHref" title={text} to={`/address/${text}`}>
            {subStrFormatter(text)}
          </Link>
        ) : (
          <span>{subStrFormatter(text)}</span>
        );
      },
    },
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      render: (text, record) => {
        return address && address === record.from ? (
          <p className="tx_status tx_status_out">
            <FormattedMessage id="TX_OUT" />
          </p>
        ) : (
          <p className="tx_status tx_status_in">
            <FormattedMessage id="TX_IN" />
          </p>
        );
      },
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_RECEIVED' }),
      dataIndex: 'toAddress',
      key: 'toAddress',
      render: (text, record) => {
        return text ? (
          <Link className="detailValueHref" title={text} to={`/address/${text}`}>
            {subStrFormatter(text)}
          </Link>
        ) : (
          <span>Contract Creation</span>
        );
      },
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_AMOUNT' }),
      dataIndex: 'quantity',
      key: 'quantity',
      className: 'textAlignRight',
      render: text => <div> {numberFormat(text)}</div>,
    },
  ];
}

// HRC20 721代币转移
export function ERC20Transaction(address, path) {
  return [
    {
      title: formatMessage({ id: 'TABLE_NO' }),
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 60,
    },
    {
      title: formatMessage({ id: 'TX_HASH' }),
      dataIndex: 'txHash',
      key: 'txHash',
      render: text => (
        <Link className="detailValueHref" title={text} to={`/tx/${text}`}>
          {subStrFormatter(text)}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'BLOCK_NUMER' }),
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      render: text => (
        <Link className="detailValueHref" title={text} to={`/block/${text}`}>
          {text}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_TIME' }),
      dataIndex: 'blockTimestamp',
      key: 'blockTimestamp',
      render: text => <span>{formatTimestamp(text)}</span>,
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_SENT' }),
      dataIndex: 'fromAddress',
      key: 'fromAddress',
      render: (text, record) => {
        return address !== text ? (
          <Link className="detailValueHref" title={text} to={`/address/${text}`}>
            {subStrFormatter(text)}
          </Link>
        ) : (
          <span title={text}>{subStrFormatter(text)}</span>
        );
      },
    },
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      render: (text, record) => {
        return address && address === record.fromAddress ? (
          <p className="tx_status tx_status_out">
            <FormattedMessage id="TX_OUT" />
          </p>
        ) : (
          <p className="tx_status tx_status_in">
            <FormattedMessage id="TX_IN" />
          </p>
        );
      },
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_RECEIVED' }),
      dataIndex: 'toAddress',
      key: 'toAddress',
      render: (text, record) => {
        return text ? (
          address !== text ? (
            <Link className="detailValueHref" title={text} to={`/address/${text}`}>
              {subStrFormatter(text)}
            </Link>
          ) : (
            <span title={text}>{subStrFormatter(text)}</span>
          )
        ) : (
          <span>Contract Creation</span>
        );
      },
    },
    {
      title: formatMessage({ id: 'Token' }),
      dataIndex: 'tokenType',
      key: 'tokenType',
      className: path !== 'HRC20' ? 'textHiden' : 'textAlignRight',
      render: (text, record) => (
        <Link className="detailValueHref" title={text} to={`/HRC20/${record.contractAddress}`}>
          <div className="textAlignRight">{text}</div>
        </Link>
      ),
    },
    // HRC721
    {
      title: formatMessage({ id: 'tokenId' }),
      className: path !== 'HRC721' ? 'textHiden' : '',
      dataIndex: 'tokenId',
      key: 'tokenId',
      render: (text, record) => (
        <Link
          className="detailValueHref"
          title={text}
          to={`/token/${record.contractAddress}?tokenId=${text}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'Quantity' }),
      dataIndex: 'quantity',
      key: 'id',
      className: 'textAlignRight',
      render: text => <div className="textAlignRight">{numberFormat(text)}</div>,
    },
  ];
}

// 代币转移
export function TokenTransfer(address, path = 'HRC20', tokenId) {
  return [
    {
      title: formatMessage({ id: 'TABLE_NO' }),
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 60,
    },
    {
      title: formatMessage({ id: 'TX_HASH' }),
      dataIndex: 'txHash',
      key: 'txHash',
      render: text => (
        <Link className="detailValueHref" title={text} to={`/tx/${text}`}>
          {subStrFormatter(text)}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'BLOCK_NUMER' }),
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      render: text => (
        <Link className="detailValueHref" title={text} to={`/block/${text}`}>
          {text}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_TIME' }),
      dataIndex: 'blockTimestamp',
      key: 'blockTimestamp',
      render: text => <span>{formatTimestamp(text)}</span>,
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_SENT' }),
      dataIndex: 'fromAddress',
      key: 'fromAddress',
      render: (text, record) => {
        return address !== text ? (
          <Link className="detailValueHref" title={text} to={`/address/${text}`}>
            {subStrFormatter(text)}
          </Link>
        ) : (
          <span title={text}>{subStrFormatter(text)}</span>
        );
      },
    },
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      render: (text, record) => {
        return address && address === record.from ? (
          <p className="tx_status tx_status_out">
            <FormattedMessage id="TX_OUT" />
          </p>
        ) : (
          <p className="tx_status tx_status_in">
            <FormattedMessage id="TX_IN" />
          </p>
        );
      },
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_RECEIVED' }),
      dataIndex: 'toAddress',
      key: 'toAddress',
      render: (text, record) => {
        return text ? (
          address !== text ? (
            <Link className="detailValueHref" title={text} to={`/address/${text}`}>
              {subStrFormatter(text)}
            </Link>
          ) : (
            <span title={text}>{subStrFormatter(text)}</span>
          )
        ) : (
          <span>Contract Creation</span>
        );
      },
    },
    // HRC721
    {
      title: formatMessage({ id: 'tokenId' }),
      className: path !== 'HRC721' ? 'textHiden' : '',
      dataIndex: 'tokenId',
      key: 'tokenId',
      render: (text, record) => {
        return tokenId !== text ? (
          <Link
            className="detailValueHref"
            title={text}
            to={`/token/${record.contractAddress}?tokenId=${text}`}
          >
            {text}
          </Link>
        ) : (
          <span>{text}</span>
        );
      },
    },
    // // HRC721
    // {
    //   title: formatMessage({ id: 'BLOCK_TX_TABLE_PAY' }),
    //   className: path !== 'HRC721' ? 'textHiden' : 'textAlignRight',
    //   dataIndex: 'gasSpent',
    //   key: 'gasSpent',
    //   render: text => <div className="textAlignRight">{'未对接'}</div>,
    // },
    // HRC20
    {
      title: formatMessage({ id: 'Quantity' }),
      dataIndex: 'quantity',
      key: 'quantity',
      className: 'textAlignCenter',
      render: text => <div className="textAlignCenter">{numberFormat(text)}</div>,
    },
  ];
}
// 持有人列表
export function HolderTable(address) {
  return [
    {
      title: formatMessage({ id: 'AC_RANKING' }),
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 60,
    },
    {
      title: formatMessage({ id: 'TABLE_ADDRESS' }),
      dataIndex: 'address',
      key: 'address',
      render: text => (
        <Link className="detailValueHref" title={text} to={`/address/${text}`}>
          {subStrFormatter(text)}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'TABLE_HELD' }),
      dataIndex: 'balanceAmount',
      key: 'balanceAmount',
      render: text => <span>{numberFormat(text)}</span>,
    },
    {
      title: formatMessage({ id: 'AC_PERCENTAGE' }),
      dataIndex: 'balancePercertRateOfCurrentErcToken',
      key: 'balancePercertRateOfCurrentErcToken',
    },
    {
      title: formatMessage({ id: 'AC_TOTAL_TANS' }),
      dataIndex: 'transferNumberOfCurrentErcToken',
      key: 'transferNumberOfCurrentErcToken',
      className: 'textAlignCenter',
    },
  ];
}

// 代币交易
export function TokenTtransaction(address) {
  return [
    {
      title: formatMessage({ id: 'TABLE_NO' }),
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 60,
      render: text => <span>{text}</span>,
    },
    {
      title: formatMessage({ id: 'TX_HASH' }),
      dataIndex: 'transactionHash',
      key: 'transactionHash',
      render: (text, row) => (
        <Link className="detailValueHref" title={text} to={`/tx/${text}`}>
          {Number(row.transactionStatus) === 0 && (
            <Icon
              type="exclamation-circle"
              theme="twoTone"
              twoToneColor="red"
              style={{ marginRight: 10 }}
            />
          )}
          {subStrFormatter(text, Number(row.transactionStatus) !== 0)}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'BLOCK_NUMER' }),
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      render: text => (
        <Link className="detailValueHref" title={text} to={`/block/${text}`}>
          {text}
        </Link>
      ),
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_TIME' }),
      dataIndex: 'transactionTimestamp',
      key: 'transactionTimestamp',
      render: text => <span>{formatTimestamp(text)}</span>,
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_SENT' }),
      dataIndex: 'from',
      key: 'from',
      render: (text, record) => {
        return address !== text ? (
          <Link className="detailValueHref" title={text} to={`/address/${text}`}>
            {subStrFormatter(text)}
          </Link>
        ) : (
          <span title={text}>{subStrFormatter(text)}</span>
        );
      },
    },
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      render: (text, record) => {
        return address && address === record.from ? (
          <p className="tx_status tx_status_out">
            <FormattedMessage id="TX_OUT" />
          </p>
        ) : (
          <p className="tx_status tx_status_in">
            <FormattedMessage id="TX_IN" />
          </p>
        );
      },
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_RECEIVED' }),
      dataIndex: 'to',
      key: 'to',
      render: (text, record) => {
        return text ? (
          <Link className="detailValueHref" title={text} to={`/address/${text}`}>
            {subStrFormatter(text)}
          </Link>
        ) : (
          <span>Contract Creation</span>
        );
      },
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_AMOUNT' }),
      dataIndex: 'valueStr',
      key: 'valueStr',
      className: 'textAlignCenter',
      render: text => <div className="textAlignCenter">{numberFormat(text)}</div>,
    },
    {
      title: formatMessage({ id: 'BLOCK_TX_TABLE_PAY' }),
      dataIndex: 'gasSpent',
      key: 'gasSpent',
      className: 'textAlignRight',
      render: text => <div className="textAlignRight">{numberFormat(text)}</div>,
    },
  ];
}

export function Storage(tokenId) {
  return [
    {
      title: formatMessage({ id: 'TABLE_NO' }),
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 60,
      render: text => <span>{text}</span>,
    },
    {
      title: formatMessage({ id: 'tokenId' }),
      dataIndex: 'tokenId',
      key: 'tokenId',
      className: 'textAlignCenter',
      render: (text, record) => {
        return tokenId !== text ? (
          <Link
            className="detailValueHref"
            title={text}
            to={`/token/${record.parentErc721Address}?tokenId=${text}`}
          >
            {text}
          </Link>
        ) : (
          <span>{text}</span>
        );
      },
    },
    {
      title: formatMessage({ id: 'Holder' }),
      dataIndex: 'holderAddress',
      key: 'holderAddress',
      className: 'textAlignCenter',
      render: text => (
        <Link className="detailValueHref" title={text} to={`/address/${text}`}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Icon',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      className: 'textAlignCenter',
      render: text => <MyImage src={text} />,
    },
  ];
}
