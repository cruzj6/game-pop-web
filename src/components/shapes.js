import PropTypes from 'prop-types';

export default {
	ServiceData: {
		name: PropTypes.string,
		date: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		hits: PropTypes.string,
	},
};
