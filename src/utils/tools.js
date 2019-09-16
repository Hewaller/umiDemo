import moment from 'moment';
import { formatMessage } from 'umi/locale';
import numeral from 'numeral';
import { message } from 'antd';

var yearAgo = formatMessage({ id: 'YEAR_AGO' });
var monthAgo = formatMessage({ id: 'MONTH_AGO' });
var dayAgo = formatMessage({ id: 'DAY_AGO' });
var hourAgo = formatMessage({ id: 'HOUR_AGO' });
var minuteAgo = formatMessage({ id: 'MINUTE_AGO' });
var secondAgo = formatMessage({ id: 'SECOND_AGO' });

export function formatTimestamp(timestamp) {
  if (!timestamp) {
    return null;
  }
  var time = moment.duration(new Date().getTime() - timestamp * 1000, 'ms');
  if (time.get('years') > 0) {
    return time.get('years') + yearAgo;
  } else if (time.get('months') > 0) {
    return time.get('months') + monthAgo;
  } else if (time.get('days') > 0) {
    return time.get('days') + dayAgo;
  } else if (time.get('hours') > 0) {
    return time.get('hours') + hourAgo;
  } else if (time.get('minutes') > 0) {
    return time.get('minutes') + minuteAgo;
  } else {
    if (time.get('seconds') > 0) {
      return time.get('seconds') + secondAgo;
    } else {
      return '1' + secondAgo;
    }
  }
}

export function subStrFormatter(str, bollean = true) {
  if (!str) {
    return;
  }
  var v = str.toString();
  // var len = str.length;
  // var xx = str.substring(8, len - 8);
  // var values = str.replace(xx, "****");
  return (
    <div
      className={bollean ? 'subStrFormatter' : 'subStrFormatter errorTrans'}
      style={{ verticalAlign: 'top' }}
    >
      {v}
    </div>
  );
}

export function calcHPB(param) {
  var num = param / 1000000000000000000;
  if (isNaN(num)) {
    return num;
  }
  var str = '' + num;
  if (!/e/i.test(str)) {
    return num;
  }

  return num.toFixed(18).replace(/\.?0+$/, '');
}
export function calcGwei(param) {
  var num = param / 1000000000;
  if (isNaN(num)) {
    return num;
  }
  var str = '' + num;
  if (!/e/i.test(str)) {
    return num;
  }

  return num.toFixed(18).replace(/\.?0+$/, '');
}

export function numberFormat(num) {
  const regexp = /(?:\.0*|(\.\d+?)0+)$/;
  if (isNaN(num)) {
    return num;
  }
  if (Number(num) === 0) {
    return 0;
  }
  // numeral(0.000001).format('0')  => NAN
  return Number(num) > 0.000001
    ? numeral(num).format('0, 0.[000000000000000000]')
    : num.replace(regexp, '$1');
}

export function copy(id) {
  const range = document.createRange();
  range.selectNode(document.getElementById(id));
  const selection = window.getSelection();
  if (selection.rangeCount > 0) selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  message.success(formatMessage({ id: 'COPY_SUCCESS' }));
}
