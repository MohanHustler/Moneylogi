import moment from 'moment';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export const toCapitalizeFirstLetter = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return '-';
};

export const toDateFormat = (string) => {
  if (string) {
    const date = new Date(string);
    const newDate = moment(date).format('DD-MMM-YYYY');

    return newDate;
  }
  return '-';
};

export const toDateTimeFormat = (string) => {
  if (string) {
    const date = new Date(string);
    const newDate = moment(date).format('DD-MMM-YYYY HH:mm:ss');

    return newDate;
  }
  return '-';
};

export const toTimeAgoFormat = (dateString) => {
  return timeAgo.format(new Date(dateString));
};

export const toNumberWithCommaAndDecimal = (number) => {
  const cardValue = parseFloat(number).toLocaleString('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 2,
  });

  if (cardValue.indexOf('.') === -1) {
    return `${cardValue}.00`;
  }

  return cardValue;
};
