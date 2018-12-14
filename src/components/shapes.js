import PropTypes from 'prop-types';

const shapes = {
	ServiceData: {
		name: PropTypes.string,
		date: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		hits: PropTypes.string,
	},
};

export default shapes;
