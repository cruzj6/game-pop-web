import PropTypes from 'prop-types';

export default {
	PopularListItem: {
		name: PropTypes.string.isRequired,
		hits: PropTypes.string.isRequired,
		link: PropTypes.string,
	},
};
