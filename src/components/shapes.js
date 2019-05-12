import PropTypes from 'prop-types';

const shapes = {
	ServiceData: {
		name: PropTypes.string,
		date: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		hits: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	},
};

export default shapes;
