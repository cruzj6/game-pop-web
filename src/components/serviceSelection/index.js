import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import constants from '../../constants';

const ServiceSelection = ({ onSelect }) => (
	<select onSelect={onSelect}>
		{
			Object.values(constants.SERVICE_NAMES).map(
				serviceName => <option key={serviceName} value={serviceName}>{serviceName}</option>,
			)
		}
	</select>
);

ServiceSelection.propTypes = {
	onSelect: PropTypes.func,
};

ServiceSelection.defaultProps = {
	onSelect: undefined,
};

export default compose(
	withHandlers({
		onSelect: ({ onSelect }) => event => onSelect(event.target.value),
	}),
)(ServiceSelection);
