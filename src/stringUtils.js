import moment from 'moment';

const StringUtils = {};

StringUtils.getDateWithTime = date => moment(date).format('MM/DD/YYYY hh:mma');
StringUtils.getMMDDYYYY = date => moment(date).format('MM/DD/YYYY');

export default StringUtils;
