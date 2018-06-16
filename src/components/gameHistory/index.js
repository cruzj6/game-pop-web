import React from 'react';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import PopularityChart from '../visualization/popularity';
import ServiceHitsList from '../serviceHitsList';
import GameButtons from '../gameButtons';
import constants from '../../constants';

const GameHistory = ({ name, serviceName }) => (
	<div>
		<GameButtons serviceName={serviceName} gameName={name} />
		<PopularityChart name={name} serviceName={serviceName} />
		<ServiceHitsList gameName={name} serviceName={serviceName} />
	</div>
);

GameHistory.propTypes = {
	name: PropTypes.string.isRequired,
	serviceName: PropTypes.oneOf(Object.values(constants.SERVICE_NAMES)).isRequired,
};

export default compose(
	mapProps(({ match, ...rest }) => ({
		name: match.params.name,
		serviceName: match.params.serviceName,
		...rest,
	})),
)(GameHistory);
